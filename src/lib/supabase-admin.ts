import { createClient } from "@supabase/supabase-js";

// STRICT SERVER-SIDE ONLY: Service Role Key allows bypassing RLS and managing auth accounts.
// NEVER prefix this key with NEXT_PUBLIC_!
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://placeholder-eightracer.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isServiceRoleConfigured = Boolean(
  serviceRoleKey && !serviceRoleKey.includes("placeholder")
);

// ── Warn in production if service role key is missing ────────────────────────
// Individual functions already guard with isServiceRoleConfigured before using
// the service role client, so a module-level throw is too aggressive.
if (process.env.NODE_ENV === "production" && !isServiceRoleConfigured) {
  console.error(
    "[Eightracer] WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. " +
      "Admin write operations (create user, audit logs) will be limited. " +
      "Set SUPABASE_SERVICE_ROLE_KEY in Vercel environment variables."
  );
}

// In development, fall back to anon key so local dev still works without service key
const activeKey =
  serviceRoleKey ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

if (!isServiceRoleConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "[Eightracer] WARNING: Running supabase-admin with anon key (dev fallback). " +
      "Set SUPABASE_SERVICE_ROLE_KEY for full admin capabilities."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, activeKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
