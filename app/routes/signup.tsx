import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "react-router";
import { z } from "zod";

import type { Route } from "./+types/signup";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createSupabaseServerClient, getUser, getRedirectTo } from "~/lib/supabase.server";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export async function loader({ request }: Route.LoaderArgs) {
  // If already logged in, redirect to dashboard
  const user = await getUser(request);
  if (user) {
    const redirectTo = getRedirectTo(request);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect(redirectTo);
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const response = new Response();
  const supabase = createSupabaseServerClient(request, response);

  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate form data
  const result = signupSchema.safeParse({ email, password, confirmPassword });
  if (!result.success) {
    return {
      error: "Please check your input",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Attempt signup
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`,
    },
  });

  if (error) {
    return {
      error: error.message,
      errors: {},
    };
  }

  // Check if user was created successfully
  if (data.user) {
    // Success - show confirmation message
    return {
      success: data.user.email_confirmed_at
        ? "Account created successfully! You can now sign in."
        : "Please check your email to confirm your account before signing in.",
      errors: {},
    };
  }

  // Fallback error (shouldn't happen)
  return {
    error: "Something went wrong during account creation. Please try again.",
    errors: {},
  };
}

export default function Signup({ actionData }: Route.ComponentProps) {
  const { register, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started with CV Forge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            method="post"
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
              {actionData?.errors && "email" in actionData.errors && actionData.errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {actionData.errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
              {actionData?.errors && "password" in actionData.errors && actionData.errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {actionData.errors.password[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
              {actionData?.errors && "confirmPassword" in actionData.errors && actionData.errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {actionData.errors.confirmPassword[0]}
                </p>
              )}
            </div>

            {actionData?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {actionData.error}
                </p>
              </div>
            )}

            {actionData?.success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                <p className="text-sm text-green-600 dark:text-green-400">
                  {actionData.success}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center">
              <a
                href="/login"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Already have an account? Sign in
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "/auth/linkedin"}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
