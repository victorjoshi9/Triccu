import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Third-party mock function (e.g. Samsung Knox, Firebase, or Google EMM API)
async function triggerThirdPartyDeviceLock(imei: string, action: 'LOCK' | 'UNLOCK') {
  // In a real scenario, you'd call the MDM provider's API here.
  // Example: await fetch('https://api.samsungknox.com/v1/devices/lock', { ... })
  console.log(`[ThirdPartyAPI] Device with IMEI ${imei} received ${action} command.`);
  return { success: true, transactionId: `txn_${Date.now()}` };
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    // 1. Basic Security: Ensure the request comes with a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized. Missing or invalid Bearer token.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token via Supabase Auth
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
    }

    // 3. Parse Request Payload
    const body = await request.json();
    const { action, payload } = body;

    // 4. Handle Actions based on request
    switch (action) {
      case 'DEVICE_LOCK':
      case 'DEVICE_UNLOCK': {
        const { loanId, imei } = payload;
        
        if (!loanId || !imei) {
          return NextResponse.json({ error: 'Missing loanId or imei in payload.' }, { status: 400 });
        }

        // Verify if the user has permission to do this (e.g. is Admin, or the user is the customer linked to this loan).
        // Since this is the centralized API, we'll verify the loan exists.
        const { data: loan, error: loanError } = await supabaseAdmin
          .from('loans')
          .select('*')
          .eq('id', loanId)
          .single();

        if (loanError || !loan) {
           return NextResponse.json({ error: 'Loan not found.' }, { status: 404 });
        }

        // Call Third Party MDM Integration
        const mdmResponse = await triggerThirdPartyDeviceLock(imei, action === 'DEVICE_LOCK' ? 'LOCK' : 'UNLOCK');

        if (!mdmResponse.success) {
          return NextResponse.json({ error: 'Third-party MDM integration failed.' }, { status: 502 });
        }

        // Update Supabase state
        const { error: updateError } = await supabaseAdmin
          .from('loans')
          .update({ 
            device_status: action === 'DEVICE_LOCK' ? 'LOCKED' : 'ACTIVE',
            updated_at: new Date().toISOString()
          })
          .eq('id', loanId);

        if (updateError) {
          return NextResponse.json({ error: 'Database update failed.' }, { status: 500 });
        }

        return NextResponse.json({ 
          success: true, 
          message: `Device successfully ${action === 'DEVICE_LOCK' ? 'locked' : 'unlocked'}.`,
          mdmTransactionId: mdmResponse.transactionId
        });
      }

      // Add more handlers here (e.g., APPROVE_LOAN, INITIATE_PAYOUT, RAZORPAY_WEBHOOK_SIMULATION)
      case 'APPROVE_LOAN': {
         // Logic for secure loan approval
         return NextResponse.json({ success: true, message: 'Loan approved.' });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
