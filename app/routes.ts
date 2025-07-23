import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("showcase", "routes/showcase.tsx"),
  route("health", "routes/health.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("logout", "routes/logout.tsx"),
  route("auth/callback", "routes/auth.callback.tsx"),
  route("auth/confirm", "routes/auth.confirm.tsx"),
  route("auth/linkedin", "routes/auth.linkedin.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
