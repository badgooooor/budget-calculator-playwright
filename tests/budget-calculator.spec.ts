import { expect, test } from "@playwright/test";
import { FinancialCalculatorPage } from "../app/financialCalculatorPage";
import { BudgetCalculatorPage } from "../app/budgetCalculatorPage";

test("should able to go to budget calculator page, fill in form and get expense budget", async ({ page }) => {
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
  await budgetCalculatorPage.typeZipCodeInput("94302");
  await expect(page).toHaveScreenshot('budget-calculator-page-form.png', { fullPage: true });

  await budgetCalculatorPage.submitForm();

  await expect(budgetCalculatorPage.expenseBudgetContent).toBeVisible();
  await expect(page).toHaveScreenshot('budget-calculator-page-content.png');

  expect(budgetCalculatorPage.userViewedScreen.isViewedScreenEventSent).toBe(true);
});
