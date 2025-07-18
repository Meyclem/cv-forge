import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Home, { meta } from "./home";

describe("Home", () => {
  it("renders the Welcome component", () => {
    render(<Home />);
    expect(screen.getAllByAltText("React Router")).toHaveLength(2);
  });

  it("returns correct meta information", () => {
    const metaResult = meta({} as Parameters<typeof meta>[0]);
    expect(metaResult).toEqual([
      { title: "New React Router App" },
      { name: "description", content: "Welcome to React Router!" },
    ]);
  });
});
