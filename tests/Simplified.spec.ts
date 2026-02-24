import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

setup("Verify Simplied EAP Form functionality", async({page}) => {
    await page.goto("https://alpha-3.ifrc-go.dev.togglecorp.com/eap/33/simplified");
    await expect(page.getByRole("heading", { level: 1, name: "Simplified EAP form" }) ).toBeVisible();
      await page.evaluate(() => window.scrollTo(0, 0));

    // await expect(page.getByRole('textbox', {name : 'Nepal REd cross Society'})).toBeVisible();
    // await expect(page.getByRole('textbox', {name : 'Papua New Guinea'})).toBeVisible();
    // await expect(page.getByRole('textbox', {name : 'Civil Unrest'})).toBeVisible();
    // const input = page.locator('input[type="file"]');
    // await input.setInputFiles('c:\Users\sapan\Downloads\vecteezy_majestic-mountain-range-reflects-tranquil-beauty-in-nature_26351109.jpg');
    //  await page.getByRole("button", {name : "Open" }).click();
    

await page. locator('text=Select an image').click();

 const filePath = path.join(
    process.env.HOME ?? process.cwd(), 
    'Downloads',
    'vecteezy_majestic-mountain-range-reflects-tranquil-beauty-in-nature_26351109.jpg'
  );

  // optional: assert file exists
  expect(fs.existsSync(filePath)).toBeTruthy();

  const photoInput = page.locator('input[type="file"]');
  await photoInput.setInputFiles(filePath);  
  await page.getByRole('button', { name: 'Open' }).click();

   



    






})