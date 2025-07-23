import { redirect } from "react-router";

import type { Route } from "./+types/auth.linkedin";

import { createSupabaseServerClient } from "~/lib/supabase.server";

export async function loader({ request }: Route.LoaderArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  // Get the current URL to determine the correct redirect URL
  const url = new URL(request.url);
  const origin = url.origin;

  // Create LinkedIn OAuth URL
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("LinkedIn OAuth error:", error);
    return redirect("/login?error=oauth_init_failed");
  }

  if (data.url) {
    return redirect(data.url, {
      headers: response.headers,
    });
  }

  // Fallback if no URL is returned
  return redirect("/login");
}

export default function LinkedInAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Redirecting to LinkedIn...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we redirect you to LinkedIn.</p>
      </div>
    </div>
  );
}
