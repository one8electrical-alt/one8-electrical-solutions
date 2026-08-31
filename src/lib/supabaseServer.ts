/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isPlaceholderEnv } from "./mockSupabase";
import { getMockSupabaseServer } from "./mockSupabaseServer";

export async function createClient() {
  const cookieStore = await cookies();

  if (isPlaceholderEnv()) {
    return getMockSupabaseServer(cookieStore) as any;
  }

  // Provide fallback placeholder values during Next.js build if env variables are not present
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Can be ignored if called from Server Component
        }
      },
    },
  });
}
