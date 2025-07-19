import { Welcome } from "../welcome/welcome";

import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // Fixed: correct type assignment
  const name: string = "TypeScript works!";
  return (
    <>
      <Welcome />
      <div>{name}</div>
    </>
  );
}
