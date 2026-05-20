import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the Service Role Key
// WARNING: This key can bypass Row Level Security (RLS). 
// NEVER expose this client to the frontend or public-facing code.
// ONLY use this inside Next.js API Routes (Serverless Functions) or Server Actions.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
