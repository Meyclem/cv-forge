import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "react-router";

import { createSupabaseServerClient } from "~/lib/supabase.server";

interface LoaderArgs {
  request: Request;
}

export async function loader({ request }: LoaderArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers: response.headers });
    }
  }

  // Return user to login with error
  return redirect("/login?error=email_verification_failed");
}
