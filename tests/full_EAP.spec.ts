import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import * as fs from 'fs';

const fixtures = JSON.parse(fs.readFileSync('fixtures.json', 'utf-8'));

test.use({ storageState: 'auth.json' });



async function openSection(page: Page, dot: number, heading: string) {
  await page.goto(fixtures.paths.url);
  await expect(page.getByRole('heading', { level: 1, name: 'Full EAP form' })).toBeVisible();
  await page.locator('._dot_1spp3_157').nth(dot).click();
  await expect(page.getByRole('heading', { level: 3, name: heading })).toBeVisible();
}

async function setNumber(page: Page, locator: string, value: string) {
  const input = page.locator(locator);
  while ((await input.inputValue()) !== value) {
    await input.press('ArrowUp');
  }
}

async function uploadImage(page: Page, index: number = 0) {
  await page.locator('input[type="file"]').nth(index).setInputFiles(fixtures.paths.image);
}

async function uploadDoc(page: Page, name: string) {
  await page.locator(`input[name="${name}"]`).setInputFiles(fixtures.paths.document);
}

test.describe('FEAP', () => {

  test('Overview', async ({ page }) => {

    await openSection(page, 0, 'Details');

    await expect(page.locator('input[name="national_society"]')).toHaveValue(/.+/);
    await expect(page.locator('input[name="country"]')).toHaveValue(/.+/);
    await expect(page.locator('input[name="disaster_type"]')).toHaveValue(/.+/);

    await uploadImage(page);

    await expect(page.locator('input[name="expected_submission_time"]')).toHaveValue(/.+/);

    await page.locator('textarea[name="objective"]').fill(fixtures.textAreas.objective);
    //NS Contact 
    const NScon=page.locator('input[name="name"]').nth(0); 
    const NScon1=page.locator('input[name="title"]').nth(0); 
    const NScon2=page.locator('input[name="email"]').nth(0); 
    const NScon3=page.locator('input[name="phone_number"]').nth(0); 
    if(await NScon.inputValue() === "") { 
        await NScon.fill(fixtures.inputValues.Name[0]); 
    } 
    else if(await NScon1.inputValue() ===""){ 
        await NScon1.fill(fixtures.inputValues.Title[0]); 
    } 
    else if(await NScon2.inputValue() === "") { 
        await NScon2.fill(fixtures.inputValues.email[0]);
    } 
    else if(await NScon3.inputValue() === "") { 
        await NScon3.fill(fixtures.inputValues.pn[0]); 
    } 
    else { 
        await page.getByRole('button',{name:'Add Partner NS'}).click(); 
    } 
    //Partner NS 
    await expect(page.getByRole('grid').nth(15)).toBeVisible(); 
    const PartnerNS=page.locator('input[name="name"]').nth(1); 
    await PartnerNS.fill(fixtures.inputValues.Name[1]); 
    const PartnerNS1=page.locator('input[name="title"]').nth(1); 
    await PartnerNS1.fill(fixtures.inputValues.Title[1]); 
    const PartnerNS2=page.locator('input[name="email"]').nth(1); 
    await PartnerNS2.fill(fixtures.inputValues.email[1]); 
    const PartnerNS3=page.locator('input[name="phone_number"]').nth(1); 
    await PartnerNS3.fill(fixtures.inputValues.pn[1]); 
    await page.getByRole('button').nth(19).click();
    //Delegation //IRFC Delegation AA Focal Point 
    const IDAFP=page.locator('input[name="name"]').nth(1); 
    await IDAFP.fill(fixtures.inputValues.Name[2]); 
    const IDAFP1=page.locator('input[name="title"]').nth(1); 
    await IDAFP1.fill(fixtures.inputValues.Title[2]); 
    const IDAFP2=page.locator('input[name="email"]').nth(1); 
    await IDAFP2.fill(fixtures.inputValues.email[2]); 
    const IDAFP3=page.locator('input[name="phone_number"]').nth(1); 
    await IDAFP3.fill(fixtures.inputValues.pn[2]); 
    //IRFC Head of Delegation 
    const IHOD=page.locator('input[name="name"]').nth(2); 
    const IHOD1=page.locator('input[name="title"]').nth(2); 
    const IHOD2=page.locator('input[name="email"]').nth(2); 
    const IHOD3=page.locator('input[name="phone_number"]').nth(2); 
    if(await IHOD.inputValue() === "") { 
        await IHOD.fill(fixtures.inputValues.Name[3]); 
    } 
    else if (await IHOD1.inputValue() === ""){ 
        await IHOD1.fill(fixtures.inputValues.Title[3]);
    } 
    else if (await IHOD2.inputValue() === "") { 
        await IHOD2.fill(fixtures.inputValues.email[3]); 
    }
    else (await IHOD3.inputValue() === "" ) { 
        await IHOD3.fill(fixtures.inputValues.pn[3]); 
    } 
    //DREF Focal Point 
    const DFP=page.locator('input[name="name"]').nth(3); 
    const DFP1=page.locator('input[name="title"]').nth(3); 
    const DFP2=page.locator('input[name="email"]').nth(3); 
    const DFP3=page.locator('input[name="phone_number"]').nth(3); 
    if(await DFP.inputValue() === "") { 
        await DFP.fill(fixtures.inputValues.Name[4]); 
    } 
    else if (await DFP1.inputValue() === ""){ 
        await DFP1.fill(fixtures.inputValues.Title[4]); 
    } 
    else if (await DFP2.inputValue() === "") { 
        await DFP2.fill(fixtures.inputValues.email[4]); 
    } 
    else (await DFP3.inputValue() === "" ) {
        await DFP3.fill(fixtures.inputValues.pn[4]); 
    }
    //IRFC Regional AA Focal Point 
    const IRAFP=page.locator('input[name="name"]').nth(4); 
    await IRAFP.fill(fixtures.inputValues.Name[5]); 
    const IRAFP1=page.locator('input[name="title"]').nth(4); 
    await IRAFP1.fill(fixtures.inputValues.Title[5]); 
    const IRAFP2=page.locator('input[name="email"]').nth(4); 
    await IRAFP2.fill(fixtures.inputValues.email[5]); 
    const IRAFP3=page.locator('input[name="phone_number"]').nth(4); 
    await IRAFP3.fill(fixtures.inputValues.pn[5]); 
    //IRFC Regional Ops Manager 
    const IROM=page.locator('input[name="name"]').nth(5); 
    await IROM.fill(fixtures.inputValues.Name[6]); 
    const IROM1=page.locator('input[name="title"]').nth(5); 
    await IROM1.fill(fixtures.inputValues.Title[6]); 
    const IROM2=page.locator('input[name="email"]').nth(5); 
    await IROM2.fill(fixtures.inputValues.email[6]); 
    const IROM3=page.locator('input[name="phone_number"]').nth(5); 
    await IROM3.fill(fixtures.inputValues.pn[6]); 
    //IRFC Regional Head of DCC 
    const IRHOD=page.locator('input[name="name"]').nth(6); 
    await IRHOD.fill(fixtures.inputValues.Name[7]); 
    const IRHOD1=page.locator('input[name="title"]').nth(6); 
    await IRHOD1.fill(fixtures.inputValues.Title[7]); 
    const IRHOD2=page.locator('input[name="email"]').nth(6); 
    await IRHOD2.fill(fixtures.inputValues.email[7]); 
    const IRHOD3=page.locator('input[name="phone_number"]').nth(6); 
    await IRHOD3.fill(fixtures.inputValues.pn[7]); 
    //IRFC Global Ops Coordinator 
    const IGOC=page.locator('input[name="name"]').nth(7); 
    await IGOC.fill(fixtures.inputValues.Name[8]); 
    const IGOC1=page.locator('input[name="title"]').nth(7); 
    await IGOC1.fill(fixtures.inputValues.Title[8]); 
    const IGOC2=page.locator('input[name="email"]').nth(7); 
    await IGOC2.fill(fixtures.inputValues.email[8]); 
    const IGOC3=page.locator('input[name="phone_number"]').nth(7); 
    await IGOC3.fill(fixtures.inputValues.pn[8]); 
    //Stakeholder 
    await page.getByText("Yes").nth(0).click(); 
    await expect(page.locator('textarea[name: "worked_with_government_description"]')).toBeVisible; 
    await page.locator('textarea[name="worked_with_government_description"]').fill(fixtures.textAreas.stakeholder1); 
    await page.getByRole('button',{name:"Add new actor"}).click(); 
    const detail1=await page.locator('input[name = "national_society"]').nth(1); 
    await detail1.click(); 
    await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[2]}).click(); 
    await page.locator('textarea[name="description"]').fill(fixtures.textAreas.stakeholder2); 
    await page.getByRole('button', { name: 'Delete Actor' }).click(); 
    await page.getByText("Yes").nth(2).click(); 
    await expect(page.locator('input[name="technically_working_group_title"]')).toBeVisible; 
    await page.locator('input[name="technically_working_group_title"]').fill(fixtures.textAreas.title); 
    await page.locator('textarea[name="technical_working_groups_in_place_description"]').fill(fixtures.textAreas.stakeholder3); 
    await page.mouse.wheel(0, 100); await page.getByRole('button',{name :"Next"}).click();

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { level: 3, name: 'Risk Analysis' })
    ).toBeVisible();

  });

  test('Risk_Analysis', async ({ page }) => {

    await openSection(page, 1, 'Risk Analysis');

    await page.locator('textarea[name="hazard_selection"]').fill(fixtures.textAreas.hazardselection);
    await uploadImage(page, 0);

    await page.locator('textarea[name="exposed_element_and_vulnerability_factor"]')
      .fill(fixtures.textAreas.exposedelements);

    await uploadImage(page, 1);

    await page.getByRole('button', { name: 'Add' }).first().click();

    await page.locator('input[name="impact"]').fill(fixtures.textAreas.impact);
    await page.locator('textarea[name="prioritized_impact"]').fill(fixtures.textAreas.prioritisedimpact);

    await uploadImage(page, 2);

    await uploadDoc(page, 'risk_analysis_relevant_files');

    await page.mouse.wheel(0, 100);

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { level: 3, name: 'Trigger Model' })
    ).toBeVisible();

  });

  test('Trigger_Model', async ({ page }) => {

    await openSection(page, 2, 'Trigger Model');

    await page.locator('textarea[name="trigger_statement"]').fill(fixtures.textAreas.triggerstatement);

    await setNumber(page, 'input[name="lead_time"]', fixtures.inputValues.lead_time);

    await page.getByRole('button', { name: 'Add' }).first().click();

    await page.locator('input[name="source_name"]').fill(fixtures.inputValues.Name[2]);
    await page.locator('input[name="source_link"]').fill(fixtures.inputValues.Link[2]);

    await page.getByRole('button', { name: 'Delete Source Information' }).click();

    await page.locator('textarea[name="forecast_selection"]').fill(fixtures.textAreas.forecastselection);

    await uploadImage(page);
    await uploadDoc(page, 'forecast_table_file');

    await page.mouse.wheel(0, 100);

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { level: 3, name: 'Selection of actions' })
    ).toBeVisible();

  });

  test('Selection_of_action', async ({ page }) => {

    await openSection(page, 3, 'Selection of actions');

    await page.getByRole('button', { name: 'Add' }).first().click();

    await page.locator('input[name="action"]').fill(fixtures.textAreas.action);

    await page.locator('textarea[name="early_action_selection_process"]')
      .fill(fixtures.textAreas.earlyaction);

    await uploadImage(page);

    await uploadDoc(page, 'theory_of_change_table_file');

    await page.locator('textarea[name="evidence_base"]').fill(fixtures.textAreas.evidencebase);

  });

  test('EAP_Activation_Process', async ({ page }) => {

    await openSection(page, 4, 'EAP Activation Process');

    await page.locator('textarea[name="early_action_implementation_process"]')
      .fill(fixtures.textAreas.earlyaction);

    await uploadImage(page);

    await page.locator('textarea[name="trigger_activation_system"]')
      .fill(fixtures.textAreas.triggerstatement);

    await uploadImage(page, 1);

    await setNumber(page, 'input[name="people_targeted"]', fixtures.inputValues.peopleTargeted);

  });

  test('MEAL', async ({ page }) => {

    await openSection(page, 5, 'Monitoring, Evaluation, Accountability Learning (Meal)');

    await page.locator('textarea[name="meal"]').fill(fixtures.textAreas.earlyaction);

    await uploadDoc(page, 'meal_relevant_files');

  });

  test('National_Society_Capacity', async ({ page }) => {

    await openSection(page, 6, 'National Society Capacity');

    await page.locator('textarea[name="operational_administrative_capacity"]')
      .fill(fixtures.textAreas.earlyaction);

    await page.locator('textarea[name="strategies_and_plans"]')
      .fill(fixtures.textAreas.earlyaction);

    await page.locator('textarea[name="advance_financial_capacity"]')
      .fill(fixtures.textAreas.earlyaction);

  });

  test('Finance_and_Logistics', async ({ page }) => {

    await openSection(page, 7, 'Finance and Logistics');

    await page.locator('textarea[name="budget_description"]')
      .fill(fixtures.textAreas.early_action_capability);

    await uploadDoc(page, 'budget_file');

    await page.locator('input[name="readiness_budget"]')
      .fill(fixtures.inputValues.readinessBudget);

    await page.locator('input[name="pre_positioning_budget"]')
      .fill(fixtures.inputValues.prePositioningBudget);

    await page.locator('input[name="early_action_budget"]')
      .fill(fixtures.inputValues.earlyActionBudget);

    await expect(page.locator('input[name="total_budget"]'))
      .toHaveValue(fixtures.inputValues.totalBudget);

    await page.locator('textarea[name="eap_endorsement"]')
      .fill(fixtures.textAreas.rcrc_movement_involvement);

  });

});