import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
test.use({ storageState: "auth.json" });
import fs from 'fs';
import path from 'path';

  const testdataPath = path.resolve('./tests/Fixtures/Testdata.json');
  const Testdata = JSON.parse(fs.readFileSync(testdataPath, 'utf-8'));

async function fillAndAssertFields(
  page: Page,
  locator: string,
  prefix: string,
  startIndex: number = 0
) 
{
  const fields = page.locator(locator);
  const count = await fields.count();

  for (let i = startIndex; i < count; i++) {
    const field = fields.nth(i);

    await expect(field).toBeVisible();

    let value;
    if (locator.includes('email')) {
      value = `test${i}@gmail.com`;
    } else if (locator.includes('phone_number')) {
      value = `57${i}123456`;
    } else {
      value = `${prefix} ${i + 1}`;
    }

    await field.fill(value);
    await expect(field).toHaveValue(value);
  }
}

test("Verify Simplified EAP Form functionality", async ({ page }) => {

  await page.goto("https://alpha-3.ifrc-go.dev.togglecorp.com/eap/9/simplified");

  await expect(page.getByRole("heading", { level: 1, name: "Simplified EAP form" })).toBeVisible();

await page.evaluate(() => window.scrollTo(0, 500));
await expect(page.locator('input[name="national_society"]')).toHaveValue(/.+/);
await expect(page.locator('input[name="country"]')).toHaveValue(/.+/);
await expect(page.locator('input[name="disaster_type"]')).toHaveValue(/.+/);


  // image upload
const fileInput = page.locator('input[type="file"]');
await fileInput.setInputFiles("C:\\Users\\sapan\\Downloads\\cloud.jpg");

await page.locator('input[name="caption"]').fill("cloud image");
await expect(page.locator('input[name="caption"]')).toHaveValue("cloud image");

//  //  delete 
// const deleteIcon = page.getByRole("button", { name: "Remove" });
// await deleteIcon.click(); 

// Timeframe field
  const timeframe = page.locator('input[type="number"]'); 
  while (await timeframe.inputValue() !== "3") {
    await timeframe.press("ArrowUp");
  }

  // national society details
await page.evaluate(() => window.scrollTo(0, 1800)); 
await page.locator('input[name="name"]').nth(0).fill(Testdata.NationalSocietyContact.NS_Name);
await page.locator('input[name="title"]').nth(0).fill(Testdata.NationalSocietyContact.NS_Title);
await page.locator('input[name="email"]').nth(0).fill(Testdata.NationalSocietyContact.NS_Email);
await page.locator('input[name="phone_number"]').nth(0).fill(Testdata.NationalSocietyContact.NS_PhoneNumber.toString());

await page.getByRole("button", { name: "Add Partner NS" }).click();
await page.locator('input[name="name"]').nth(1).fill(Testdata.NationalSocietyContact.NS_Name);
await page.locator('input[name="title"]').nth(1).fill(Testdata.NationalSocietyContact.NS_Title);
await page.locator('input[name="email"]').nth(1).fill(Testdata.NationalSocietyContact.NS_Email);
await page.locator('input[name="phone_number"]').nth(1).fill(Testdata.NationalSocietyContact.NS_PhoneNumber);

//  call
await fillAndAssertFields(page, 'input[name="name"]', 'Sapana', 2);
await fillAndAssertFields(page, 'input[name="title"]', 'Partner NS Title', 2);
await fillAndAssertFields(page, 'input[name="email"]', '', 2);
await fillAndAssertFields(page, 'input[name="phone_number"]', '', 2);

await page.getByRole('button',{name:"Next"}).click();
await expect(page.getByRole('heading',{level:3, name: "RISK ANALYSIS" })).toBeVisible();


  const description = Testdata.RiskAnalysis.RA_Description;
  const filePath = "C:\\Users\\sapan\\Downloads\\cloud.jpg";

  //  1st Description
  await page.locator('[name="prioritized_hazard_and_impact"]').fill(description);
  await expect(page.locator('[name="prioritized_hazard_and_impact"]')).toHaveValue(description);
  await page.locator('input[type="file"]').nth(0).setInputFiles(filePath);

  //  2nd Description
  await page.locator('[name="risks_selected_protocols"]').fill(description);
  await expect(page.locator('[name="risks_selected_protocols"]')).toHaveValue(description);
  await page.locator('input[type="file"]').nth(1).setInputFiles(filePath);

  //  3rd Description
  await page.locator('[name="selected_early_actions"]').fill(description);
  await expect(page.locator('[name="selected_early_actions"]')).toHaveValue(description);
  await page.locator('input[type="file"]').nth(2).setInputFiles(filePath);

// button click

await page.getByRole('button',{name:"Next"}).click();
await expect(page.getByRole('heading',{level:3, name: "Early Action Intervention" })).toBeVisible();

// Early Action Intervention
await page.locator('[name="overall_objective_intervention"]').fill(description);
await expect(page.locator('[name="overall_objective_intervention"]')).toHaveValue(description);

await page.locator('[name="potential_geographical_high_risk_areas"]').fill(description);
await expect(page.locator('[name="potential_geographical_high_risk_areas"]')).toHaveValue(description);


// Time frame
const timesframe = page.locator('input[name="people_targeted"]'); 
while(await timesframe.inputValue() !== "10") {
  await timesframe.press("ArrowUp");
}

  // description

await page.locator('[name="assisted_through_operation"]').fill(description);
await expect(page.locator('[name="assisted_through_operation"]')).toHaveValue(description);

await page.locator('[name="selection_criteria"]').fill(description);
await expect(page.locator('[name="selection_criteria"]')).toHaveValue(description);

await page.locator('[name="trigger_statement"]').fill(description);
await expect(page.locator('[name="trigger_statement"]')).toHaveValue(description);


const value = page.locator('input[name="seap_lead_time"]'); 
while(await value.inputValue() !== "2") {
  await value.press("ArrowUp");
}

// Dropdown
const openButton = page.locator('input[name="seap_lead_timeframe_unit"]').nth(0);
await openButton.fill("Months");
await page.getByRole('button',{name:"Months"}).click();

// Value
const values= page.locator('input[name="operational_timeframe"]'); 
while (await values.inputValue() !== "5") {
  await values.press("ArrowUp");
}

// Readonly Timeframe
await expect(page.locator('input[name="operational_timeframe_unit"]')).toHaveValue("Months");
// Description
await page.locator('[name="trigger_threshold_justification"]').fill(description);
await expect(page.locator('[name="trigger_threshold_justification"]')).toHaveValue(description);

await page.locator('[name="next_step_towards_full_eap"]').fill(description);
await expect(page.locator('[name="next_step_towards_full_eap"]')).toHaveValue(description);

// Back
await page.getByRole('button',{name:"Back"}).click();
await expect(page.getByRole('heading',{level:3, name: "Risk Analysis" })).toBeVisible();






});




