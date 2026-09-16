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

// ── Hard-fail in production if service role key is missing ───────────────────
// Prevents admin operations silently degrading to anon-level permissions.
if (process.env.NODE_ENV === "production" && !isServiceRoleConfigured) {
  throw new Error(
    "[Eightracer] FATAL: SUPABASE_SERVICE_ROLE_KEY is not set in the production environment. " +
      "Admin operations require a valid service role key. " +
      "Please set SUPABASE_SERVICE_ROLE_KEY in your environment variables."
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
