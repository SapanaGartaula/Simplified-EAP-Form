import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const fixtures = JSON.parse(fs.readFileSync('fixtures.json', 'utf-8'));

test.use({ storageState: 'auth.json' });
test.describe('FEAP', () => {
    test('Registration',async({page})=>{
        await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/account/my-forms/eap-applications');
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
        await page.getByRole('link',{ name:"Register Your EAP"}).click();
        await expect(page.getByRole('heading', { level: 1, name: "EAP Development Registration" })).toBeVisible();
        const detail1=await page.locator('input[name = "national_society"]').nth(0);
        await detail1.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[1]}).click();
        await expect(page.getByRole('textbox', {name : fixtures.inputValues.country[1]}).nth(1)).toBeVisible();
        const detail2=await page.locator('input[name = "disaster_type"]');
        await detail2.click();
        await page.getByRole('button',{ name:fixtures.inputValues.disastertype[1]}).click();
        await page.getByText("Full EAP").click();
        const date=await page.locator('input[name="expected_submission_time"]');
        await date.click();
        await date.press("ArrowUp");
        await date.press("ArrowRight");
        await date.press("ArrowUp");
        await date.press("ArrowRight");
        await date.press("ArrowUp");
        await date.press("ArrowRight");
        const detail3=await page.locator('input[name = "partners"]');
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[2]}).click();
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[5]}).click();
        await page.locator('input[name="name"]').nth(0).fill(fixtures.inputValues.Name[0]);
        await page.locator('input[name="title"]').nth(0).fill(fixtures.inputValues.Title[0]);
        await page.locator('input[name="email"]').nth(0).fill(fixtures.inputValues.email[0]);
        await page.locator('input[name="phone_number"]').nth(0).fill(fixtures.inputValues.pn[0]);
        await page.locator('input[name="name"]').nth(1).fill(fixtures.inputValues.Name[1]);
        await page.locator('input[name="title"]').nth(1).fill(fixtures.inputValues.Title[1]);
        await page.locator('input[name="email"]').nth(1).fill(fixtures.inputValues.email[1]);
        await page.locator('input[name="phone_number"]').nth(1).fill(fixtures.inputValues.pn[1]);
        await page.locator('input[name="name"]').nth(2).fill(fixtures.inputValues.Name[2]);
        await page.locator('input[name="title"]').nth(2).fill(fixtures.inputValues.Title[2]);
        await page.locator('input[name="email"]').nth(2).fill(fixtures.inputValues.email[2]);
        await page.locator('input[name="phone_number"]').nth(2).fill(fixtures.inputValues.pn[2]);
        await page.getByRole('button',{ name:"Submit"}).click();
        await expect(page.getByText('EAP Development RegistrationThank you for notifying us about the start of your')).toBeVisible();
        await page.getByRole('button',{ name:"Close"}).nth(1).click();
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
    })
    test('Verify_ErrorMessage_when_submitting_without_filling_the_requiredfields',async({page})=>
    {
        await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/account/my-forms/eap-applications');
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
        await page.getByRole('link',{ name:"Register Your EAP"}).click();
        await expect(page.getByRole('heading', { level: 1, name: "EAP Development Registration" })).toBeVisible();
        await page.mouse.wheel(0, 900);
        await page.getByRole('button',{ name:"Submit"}).click();
        await expect (page.getByText('The field is required').first()).toBeVisible;//NS
        await expect (page.getByText('The field is required').nth(1)).toBeVisible;//Country
        await expect (page.getByText('The field is required').nth(2)).toBeVisible;//DisasterType
        await expect (page.getByText('The field is required').nth(3)).toBeVisible;//PartnersInvolved
    })
    test('Verify_ErrorMessage_when_only_filling_RequiredFieldsinDetailssection',async({page})=>
    {
        await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/account/my-forms/eap-applications');
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
        await page.getByRole('link',{ name:"Register Your EAP"}).click();
        await expect(page.getByRole('heading', { level: 1, name: "EAP Development Registration" })).toBeVisible();
        const detail1=await page.locator('input[name = "national_society"]').nth(0);
        await detail1.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[10]}).click();
        await expect(page.getByRole('textbox', {name : fixtures.inputValues.country[10]}).nth(1)).toBeVisible();
        const detail2=await page.locator('input[name = "disaster_type"]');
        await detail2.click();
        await page.getByRole('button',{ name:fixtures.inputValues.disastertype[9]}).click();
        const detail3=await page.locator('input[name = "partners"]');
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[3]}).click();
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[6]}).click();
        await page.getByRole('button',{ name:"Submit"}).click();
        await expect(page.getByText('This field may not be null').first()).toBeVisible();//Name
        await expect(page.getByText('This field may not be null').nth(1)).toBeVisible();//Email
    })
    test('Verify_form_submission_whenRequiredFieldsinBothD&C_are_filled',async({page})=>
    {
        await page.goto('https://alpha-3.ifrc-go.dev.togglecorp.com/account/my-forms/eap-applications');
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
        await page.getByRole('link',{ name:"Register Your EAP"}).click();
        await expect(page.getByRole('heading', { level: 1, name: "EAP Development Registration" })).toBeVisible();
        const detail1=await page.locator('input[name = "national_society"]').nth(0);
        await detail1.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[10]}).click();
        await expect(page.getByRole('textbox', {name : fixtures.inputValues.country[10]}).nth(1)).toBeVisible();
        const detail2=await page.locator('input[name = "disaster_type"]');
        await detail2.click();
        await page.getByRole('button',{ name:fixtures.inputValues.disastertype[9]}).click();
        const detail3=await page.locator('input[name = "partners"]');
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[3]}).click();
        await detail3.click();
        await page.getByRole('button',{ name:fixtures.inputValues.nationalsociety[6]}).click();
        await page.getByRole('button',{ name:"Submit"}).click();
        await page.locator('input[name="name"]').nth(0).fill(fixtures.inputValues.Name[1]);
        await page.locator('input[name="email"]').nth(0).fill(fixtures.inputValues.email[1]);
        await page.getByRole('button',{ name:"Submit"}).click();
        await expect(page.getByText('EAP Development RegistrationThank you for notifying us about the start of your')).toBeVisible();
        await page.getByRole('button',{ name:"Close"}).nth(1).click();
        await expect(page.getByRole('heading', { level: 3, name: "EAP Application" })).toBeVisible();
        
    })
})