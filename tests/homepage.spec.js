import { test, expect } from "@playwright/test";

test.describe("Homepage Tests", () => {
  test("should load homepage successfully", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Check if the page title is correct
    await expect(page).toHaveTitle("my-portfolio");

    // Check if main content is visible
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");

    // Check if navigation links exist (looking for any links in the page)
    const navLinks = page.locator("a");
    await expect(navLinks.first()).toBeVisible();
  });

  test("should display contact form", async ({ page }) => {
    await page.goto("/");

    // Check if contact form is present
    const contactForm = page.locator("form");
    await expect(contactForm).toBeVisible();
  });
});
