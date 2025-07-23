import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Home, { meta } from "../app/routes/home";

describe("Home", () => {
  it("renders the CV Forge homepage", () => {
    render(<Home />);
    expect(screen.getByText("CV Forge")).toBeInTheDocument();
    expect(screen.getByText("Build professional CVs with modern technology")).toBeInTheDocument();
    expect(screen.getByText("Coming soon...")).toBeInTheDocument();
  });

  it("returns correct meta information", () => {
    const mockMetaArg: Parameters<typeof meta>[0] = {
      location: {
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default",
      },
      params: {},
      data: undefined,
      matches: [
        {
          id: "root",
          params: {},
          pathname: "/",
          meta: [],
          data: { user: null },
        },
        {
          id: "routes/home",
          params: {},
          pathname: "/",
          meta: [],
          data: undefined,
          handle: undefined,
        },
      ],
    };
    const metaResult = meta(mockMetaArg);
    expect(metaResult).toEqual([
      { title: "CV Forge" },
      { name: "description", content: "Modern CV builder application" },
    ]);
  });
});
