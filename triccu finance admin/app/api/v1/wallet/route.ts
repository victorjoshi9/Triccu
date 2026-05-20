import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, targetId, amount, type } = body;
    // type: 'SHOP' | 'AGENT' | 'CUSTOMER'
    // action: 'CREDIT' | 'DEBIT' | 'WITHDRAWAL'

    if (!action || !targetId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const table = type === 'SHOP' ? 'shops' : type === 'AGENT' ? 'agents' : 'customers';

    // In a real production system, this requires strict ACID transactions.
    // For this demonstration, we simulate the balance update.
    
    // 1. Fetch current balance
    const { data: user, error: fetchErr } = await supabase
      .from(table)
      .select('wallet_balance')
      .eq('id', targetId)
      .single();

    if (fetchErr && fetchErr.code !== 'PGRST116') {
       return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    const currentBalance = user?.wallet_balance || 0;
    let newBalance = currentBalance;

    if (action === 'CREDIT') {
      newBalance += amount;
    } else if (action === 'DEBIT' || action === 'WITHDRAWAL') {
      if (currentBalance < amount) {
        return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
      }
      newBalance -= amount;
    }

    // 2. Update balance
    const { error: updateErr } = await supabase
      .from(table)
      .update({ wallet_balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', targetId);

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `${action} successful`, 
      newBalance 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
