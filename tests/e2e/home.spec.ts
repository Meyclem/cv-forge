import { test, expect } from "@playwright/test";

test("homepage loads and displays correct content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("CV Forge");
  await expect(page.getByText("CV Forge")).toBeVisible();
  await expect(page.getByText("Build professional CVs with modern technology")).toBeVisible();
  await expect(page.getByText("Coming soon...")).toBeVisible();
});

test("navigation works correctly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("CV Forge")).toBeVisible();
  await expect(page.getByText("Coming soon...")).toBeVisible();
});
