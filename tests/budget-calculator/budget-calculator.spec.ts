import { expect, test } from "@playwright/test";
import { FinancialCalculatorPage } from "../../app/financialCalculatorPage";
import { BudgetCalculatorPage } from "../../app/budgetCalculatorPage";
import { getZipCodeData } from "../../utils/data";
import { ZipCodeFormData } from "../../types/data";

test("should able to go to budget calculator page, fill in form and get expense budget", async ({ page }) => {
  // Cast type since this is already in the list.
  const zipCodeData = getZipCodeData("94302") as ZipCodeFormData;

  const financialCalculatorPage = new FinancialCalculatorPage(page);
  await financialCalculatorPage.userViewedScreen.listenUserViewedScreenEvent();

  // Finanical calculator
  await financialCalculatorPage.goto();
  await financialCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await expect(page).toHaveScreenshot('financial-calculator-page.png');

  await financialCalculatorPage.clickBudgetCalculatorPage();
  await expect(page).toHaveScreenshot('budget-calculator-page.png');
  expect(financialCalculatorPage.userViewedScreen.isViewedScreenEventSent).toBe(true);

  // Budget calculator page
  const budgetCalculatorPage = new BudgetCalculatorPage(page);
  await budgetCalculatorPage.userViewedScreen.listenUserViewedScreenEvent();

  await budgetCalculatorPage.typeTakeHomeIncomeInput("20000");
  await budgetCalculatorPage.typeZipCodeInput(zipCodeData?.zipCode);
  await expect(page).toHaveScreenshot('budget-calculator-page-form.png', { fullPage: true });

  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.expenseBudgetContent).toBeVisible();
  await expect(budgetCalculatorPage.expenseBudgetContent).toContainText(zipCodeData.city);

  await expect(page).toHaveScreenshot('budget-calculator-page-content.png');

  expect(budgetCalculatorPage.userViewedScreen.isViewedScreenEventSent).toBe(true);
});

test("should change city if form is refilled", async ({ page }) => {
  const firstZipCodeData = getZipCodeData("94302") as ZipCodeFormData;
  const secondZipCodeData = getZipCodeData("90001") as ZipCodeFormData;

  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();
  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();

  // Fill in first zip code.
  await budgetCalculatorPage.typeTakeHomeIncomeInput("20000");
  await budgetCalculatorPage.typeZipCodeInput(firstZipCodeData?.zipCode);

  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.expenseBudgetContent).toBeVisible();
  await expect(budgetCalculatorPage.expenseBudgetContent).toContainText(firstZipCodeData.city);

  // Fill in second zip code.
  await budgetCalculatorPage.typeZipCodeInput(secondZipCodeData?.zipCode);
  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.expenseBudgetContent).toContainText(secondZipCodeData.city);
});