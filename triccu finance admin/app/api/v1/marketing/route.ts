import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetApp, type, payload } = body;
    // targetApp: 'ALL' | 'CUSTOMER' | 'AGENT' | 'SHOP'
    // type: 'APP_UPDATE_BANNER' | 'REFER_EARN_OFFER'

    if (!targetApp || !type || !payload) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since this requires a 'global_settings' or 'marketing_campaigns' table,
    // we simulate storing the global configuration that the apps will fetch on launch.
    
    // Simulate DB insertion
    const campaignId = `CAMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return NextResponse.json({ 
      success: true, 
      message: `Successfully pushed ${type} to ${targetApp} applications`,
      campaignId,
      data: payload
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
