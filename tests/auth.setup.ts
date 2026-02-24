import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authDir = path.join(__dirname, "../playwright/.auth");
const authFile = path.join(authDir, "user.json");

setup("Verify login functionality user", async ({ page }) => {
  await page.goto("https://alpha-3.ifrc-go.dev.togglecorp.com/");
 await page.goto("https://alpha-3.ifrc-go.dev.togglecorp.com/login");
  
 await page.locator('input[type="text"], input[name*="email"]').fill(process.env.Go_Username!);
await page.locator('input[type="password"]').fill(process.env.Go_Password!);


  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "IFRC Disaster Response and Preparedness" }) ).toBeVisible

  // Create auth folder if it doesn’t exist
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save the authenticated state (cookies + localStorage)
  await page.context().storageState({ path: authFile });
});