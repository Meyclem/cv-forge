import type { Route } from "./+types/dashboard";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { requireAuth } from "~/lib/supabase.server";

export async function loader({ request }: Route.LoaderArgs) {
  // This automatically redirects to login if not authenticated
  const user = await requireAuth(request);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "User",
      avatar: user.user_metadata?.avatar_url as string | undefined,
      provider: (user.app_metadata?.provider as string) || "email",
    },
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to CV Forge!</CardTitle>
                <CardDescription>
                  Your professional CV builder is ready to use.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Provider:</strong> {user.provider}</p>
                        <p><strong>User ID:</strong> {user.id}</p>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full" disabled>
                          Create New CV (Coming Soon)
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                          Manage Templates (Coming Soon)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
