import { testSupabaseConnection } from "~/lib/supabase.server";

export async function loader({ request }: { request: Request }) {
  const result = await testSupabaseConnection(request);

  return Response.json({
    supabase: result,
    timestamp: new Date().toISOString(),
  }, {
    status: result.success ? 200 : 500,
  });
}
