import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables with graceful fallback for local development & mock mode
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-eightracer.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Check if live Supabase credentials are provided
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
);

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

if (!isSupabaseConfigured && typeof window !== "undefined") {
  console.info(
    "%c[Eightracer Supabase]%c Running in offline fallback mode with rich mock data. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to connect to live Supabase.",
    "background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    "color: #6b7280; margin-left: 6px;"
  );
}
