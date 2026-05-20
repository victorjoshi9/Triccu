import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    // ACTION: Create an Order
    if (action === 'CREATE_ORDER') {
      const { amount, loanId, customerId } = payload;

      if (!amount || !loanId) {
        return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
      }

      // Create order via Razorpay API
      // Amount must be in subunits (Paise) -> amount * 100
      const options = {
        amount: Math.round(amount * 100), 
        currency: 'INR',
        receipt: `receipt_loan_${loanId}_${Date.now()}`,
        notes: {
          loanId: loanId,
          customerId: customerId || 'unknown'
        }
      };

      const order = await razorpay.orders.create(options);

      // Optionally, log this intent into Supabase
      await supabaseAdmin.from('payment_intents').insert({
        order_id: order.id,
        loan_id: loanId,
        amount: amount,
        status: 'created'
      });

      return NextResponse.json({ success: true, order });
    }

    // ACTION: Verify Payment (Usually called from Frontend after success, or via Webhook)
    if (action === 'VERIFY_PAYMENT') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, loanId } = payload;

      const bodyToSign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret')
        .update(bodyToSign.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        // Payment is verified
        // 1. Update database loan balance
        const { error: updateError } = await supabaseAdmin
          .from('loans')
          .update({ 
            last_payment_date: new Date().toISOString(),
            status: 'Active' // Ensure device isn't locked if they just paid
          })
          .eq('id', loanId);

        if (updateError) {
           console.error("Failed to update loan after payment:", updateError);
        }

        // 2. Unlock device if it was locked
        // await fetch('https://api.samsungknox.com/.../unlock');

        return NextResponse.json({ success: true, message: 'Payment verified successfully.' });
      } else {
        return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });

  } catch (error: any) {
    console.error('Razorpay API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
