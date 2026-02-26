import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const fixtures = JSON.parse(fs.readFileSync('fixtures.json', 'utf-8'));

test.use({ storageState: 'auth.json' });

test.describe('Simplified2', () => {

    test('PlannedOperations', async ({ page }) => {
        await page.goto(fixtures.urls.simplified32);
        await expect(page.getByRole('heading', { level: 1, name: fixtures.headings.formTitle })).toBeVisible();

        const fourthDot = page.locator('._dot_1spp3_157').nth(fixtures.dotsIndex.plannedOperations);
        await fourthDot.click();

        await expect(page.getByRole('heading', { level: 3, name: fixtures.headings.plannedOperations })).toBeVisible();

        await page.getByText(fixtures.checkboxes.plannedOperations[0]).first().click();

        const setandhouSection = page.locator('div._block-layout_1emxe_1').nth(1);
        await expect(setandhouSection).toBeVisible();

        const timeframe = page.locator('input[name="people_targeted"]');
        while (await timeframe.inputValue() !== fixtures.inputValues.peopleTargeted) {
            await timeframe.press('ArrowUp');
        }

        const timeframe1 = page.locator('input[name="budget_per_sector"]');
        while (await timeframe1.inputValue() !== fixtures.inputValues.budgetPerSector) {
            await timeframe1.press('ArrowUp');
        }

        const timeframe3 = page.locator('input[name="ap_code"]');
        while (await timeframe3.inputValue() !== fixtures.inputValues.apCode) {
            await timeframe3.press('ArrowUp');
        }

        await page.getByRole("button", { name: "Add indicator" }).click();
        await page.locator('input[name="title"]').fill(fixtures.inputValues.indicatorTitle);

        const target = page.locator('input[name="target"]');
        while (await target.inputValue() !== fixtures.inputValues.indicatorTarget) {
            await target.press('ArrowUp');
        }

        await page.mouse.wheel(0, 300);

        const activities = fixtures.inputValues.activities;
        for (let i = 0; i < activities.length; i++) {
            await page.getByRole('button', { name: 'Add activity' }).nth(i).click();
            await page.locator('input[name="activity"]').nth(i).fill(activities[i]);
            const openButton = page.locator('input[name="timeframe"]').nth(i);
            await openButton.fill(fixtures.inputValues.timeframeType);
            await page.getByRole('button', { name: fixtures.inputValues.timeframeType }).click();
            await page.getByText(fixtures.inputValues.activityTimeframe).nth(i).check();
        }
        await page.mouse.wheel(0, 300);
        await page.getByRole('button', { name: "Next" }).click();
        await expect(page.getByRole('heading', { level: 3, name: fixtures.headings.enablingApproaches })).toBeVisible();
    });

    test('EnablingApproaches', async ({ page }) => {
        await page.goto(fixtures.urls.simplified32);
        await expect(page.getByRole('heading', { level: 1, name: fixtures.headings.formTitle })).toBeVisible();

        const fifthDot = page.locator('._dot_1spp3_157').nth(fixtures.dotsIndex.enablingApproaches);
        await fifthDot.click();

        await expect(page.getByRole('heading', { level: 3, name: fixtures.headings.enablingApproaches })).toBeVisible();

        await page.getByText(fixtures.checkboxes.enablingApproaches[0]).first().click();

        const natsocstrenSection = page.locator('div._block-layout_1emxe_1').nth(1);
        await expect(natsocstrenSection).toBeVisible();

        const timeframe1 = page.locator('input[name="budget_per_approach"]');
        while (await timeframe1.inputValue() !== fixtures.inputValues.budgetPerSector) {
            await timeframe1.press('ArrowUp');
        }

        const timeframe3 = page.locator('input[name="ap_code"]');
        while (await timeframe3.inputValue() !== fixtures.inputValues.apCode) {
            await timeframe3.press('ArrowUp');
        }

        await page.getByRole("button", { name: "Add indicator" }).click();
        await page.locator('input[name="title"]').fill(fixtures.inputValues.indicatorTitle);

        const target = page.locator('input[name="target"]');
        while (await target.inputValue() !== fixtures.inputValues.indicatorTarget) {
            await target.press('ArrowUp');
        }

        await page.mouse.wheel(0, 300);

        const activities = fixtures.inputValues.activities;
        for (let i = 0; i < activities.length; i++) {
            await page.getByRole('button', { name: 'Add activity' }).nth(i).click();
            await page.locator('input[name="activity"]').nth(i).fill(activities[i]);
            const openButton = page.locator('input[name="timeframe"]').nth(i);
            await openButton.fill(fixtures.inputValues.timeframeType);
            await page.getByRole('button', { name: fixtures.inputValues.timeframeType }).click();
            await page.getByText(fixtures.inputValues.activityTimeframe).nth(i).check();
        }

        await page.getByRole('button', { name: "Next" }).click();
        await expect(page.getByRole('heading', { level: 3, name: fixtures.headings.conditionsEarlyAction })).toBeVisible();
    });

    test('ConditionstoDeliver&Budget', async ({ page }) => {
        await page.goto(fixtures.urls.simplified32);
        await expect(page.getByRole('heading', { level: 1, name: fixtures.headings.formTitle })).toBeVisible();

        const sixthDot = page.locator('._dot_1spp3_157').nth(fixtures.dotsIndex.conditionsEarlyAction);
        await sixthDot.click();

        await expect(page.getByRole('heading', { level: 3, name: fixtures.headings.conditionsEarlyAction })).toBeVisible();

        await page.locator('textarea[name="early_action_capability"]').fill(fixtures.textAreas.early_action_capability);

        await page.locator('textarea[name="rcrc_movement_involvement"]').fill(fixtures.textAreas.rcrc_movement_involvement);

        await page.locator('input[name="readiness_budget"]').fill(fixtures.inputValues.readinessBudget);
        await page.locator('input[name="pre_positioning_budget"]').fill(fixtures.inputValues.prePositioningBudget);
        await page.locator('input[name="early_action_budget"]').fill(fixtures.inputValues.earlyActionBudget);

        await expect(page.locator('input[name="total_budget"]')).toHaveValue(fixtures.inputValues.totalBudget);

        await page.locator('input[type="file"]').setInputFiles(fixtures.fileUpload);
    });
});