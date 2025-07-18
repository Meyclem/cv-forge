import { test, expect } from "@playwright/test";

test("homepage loads and displays correct content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("New React Router App");
  await expect(page.getByAltText("React Router").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "React Router docs" })).toBeVisible();
});

test("navigation works correctly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByAltText("React Router").first()).toBeVisible();

  const docsLink = page.getByRole("link", { name: "React Router docs" });
  await expect(docsLink).toHaveAttribute("target", "_blank");
  await expect(docsLink).toHaveAttribute("rel", "noreferrer");
});
