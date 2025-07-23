import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  Form,
} from "react-router";

import type { Route } from "./+types/root";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/supabase.server";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  // Get current user for navigation
  const user = await getUser(request);

  return {
    user: user ? {
      id: user.id,
      email: user.email,
      name: (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "User",
      avatar: user.user_metadata?.avatar_url as string | undefined,
    } : null,
  };
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink
                to="/"
                className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                CV Forge
              </NavLink>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                // Authenticated user navigation
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>

                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                  </div>

                  <Form action="/logout" method="post">
                    <Button variant="outline" size="sm" type="submit">
                      Sign out
                    </Button>
                  </Form>
                </>
              ) : (
                // Unauthenticated user navigation
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in
                  </NavLink>
                  <NavLink to="/signup">
                    <Button size="sm">
                      Get started
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
