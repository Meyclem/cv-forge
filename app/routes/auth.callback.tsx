import { redirect } from "react-router";

import type { Route } from "./+types/auth.callback";

import { createSupabaseServerClient, getRedirectTo } from "~/lib/supabase.server";

export async function loader({ request }: Route.LoaderArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  // Handle OAuth error
  if (error) {
    // eslint-disable-next-line no-console
    console.error("OAuth error:", error);
    return redirect("/login?error=oauth_error");
  }

  // Handle OAuth authorization code exchange
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      // eslint-disable-next-line no-console
      console.error("OAuth exchange error:", exchangeError);
      return redirect("/login?error=oauth_exchange_failed");
    }

    // Success - redirect to intended destination
    const redirectTo = getRedirectTo(request);
    return redirect(redirectTo, {
      headers: response.headers,
    });
  }

  // For email verification, check if user has a valid session
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // User is logged in (email verification succeeded)
    return redirect("/dashboard", {
      headers: response.headers,
    });
  }

  // No valid session - redirect to login
  return redirect("/login?error=session_invalid");
}

export default function AuthCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Completing authentication...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}
