import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseServerClient(
  request: Request,
  response?: Response,
): SupabaseClient {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl) {
    throw new Error("VITE_SUPABASE_URL is required");
  }
  if (!supabaseAnonKey) {
    throw new Error("VITE_SUPABASE_ANON_KEY is required");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get("Cookie");
        if (!cookieHeader) return [];

        return cookieHeader
          .split(";")
          .map((cookie) => {
            const [name, ...rest] = cookie.trim().split("=");
            return { name: name || "", value: rest.join("=") };
          })
          .filter((cookie) => cookie.name);
      },
      setAll(cookiesToSet) {
        if (response) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieValue = `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax${
              options?.maxAge ? `; Max-Age=${options.maxAge}` : ""
            }`;
            response.headers.append("Set-Cookie", cookieValue);
          });
        }
      },
    },
  });
}

export async function testSupabaseConnection(request: Request): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const supabase = createSupabaseServerClient(request);

    // Simple health check - try to access auth user (doesn't require database tables)
    const { error } = await supabase.auth.getUser();

    if (error && error.message !== "Auth session missing!") {
      return {
        success: false,
        error: `Supabase connection failed: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Connection error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
