import { createClient } from "@supabase/supabase-js";

// STRICT SERVER-SIDE ONLY: Service Role Key allows bypassing RLS and managing auth accounts.
// NEVER prefix this key with NEXT_PUBLIC_!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-eightracer.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isServiceRoleConfigured = Boolean(
  serviceRoleKey && !serviceRoleKey.includes("placeholder")
);

// Fallback to anon key in dev if service role key is omitted so build passes
const activeKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabaseAdmin = createClient(supabaseUrl, activeKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
