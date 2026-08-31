/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isPlaceholderEnv } from "./mockSupabase";
import { mockSupabaseClient } from "./mockSupabaseClient";

// Provide fallback placeholder values during Next.js build if env variables are not present
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

const realSupabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export const supabase = isPlaceholderEnv() ? (mockSupabaseClient as any) : realSupabase;
