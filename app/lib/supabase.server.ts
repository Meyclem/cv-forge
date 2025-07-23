import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "react-router";

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

/**
 * Get the current user from the request
 * Returns null if no user is authenticated
 */
export async function getUser(request: Request, response?: Response): Promise<User | null> {
  const supabase = createSupabaseServerClient(request, response);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Require authentication for protected routes
 * Redirects to login if user is not authenticated
 */
export async function requireAuth(request: Request, response?: Response): Promise<User> {
  const user = await getUser(request, response);

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return user;
}

/**
 * Redirect to login with optional redirect URL
 */
export function redirectToLogin(redirectTo?: string): never {
  const searchParams = redirectTo
    ? `?redirectTo=${encodeURIComponent(redirectTo)}`
    : "";
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw redirect(`/login${searchParams}`);
}

/**
 * Get redirect URL from search params, defaulting to dashboard
 */
export function getRedirectTo(request: Request, defaultRedirect = "/dashboard"): string {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  // Ensure redirect URL is safe (same origin)
  if (redirectTo) {
    try {
      const redirectUrl = new URL(redirectTo, url.origin);
      if (redirectUrl.origin === url.origin) {
        return redirectTo;
      }
    } catch {
      // Invalid URL, fall back to default
    }
  }

  return defaultRedirect;
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
