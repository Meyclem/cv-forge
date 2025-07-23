import { redirect } from "react-router";

import type { Route } from "./+types/logout";

import { createSupabaseServerClient } from "~/lib/supabase.server";

export async function action({ request }: Route.ActionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  // Sign out the user
  await supabase.auth.signOut();

  // Redirect to home page
  return redirect("/", {
    headers: response.headers,
  });
}

export function loader(): Response {
  // Handle GET requests by redirecting to home
  return redirect("/", { status: 302 });
}

export default function Logout() {
  // This component won't be rendered as we always redirect
  return null;
}
