import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

setup("Verify login functionality user", async ({ page }) => {
  await page.goto("https://alpha-3.ifrc-go.dev.togglecorp.com/login");

 await page.locator('input[type="text"], input[name*="email"]').fill(process.env.Go_Username!);
await page.locator('input[type="password"]').fill(process.env.Go_Password!);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { level: 1, name: "IFRC Disaster Response and Preparedness" })).toBeVisible();

  // Save storage state in project root
  await page.context().storageState({ path: "auth.json" });
});