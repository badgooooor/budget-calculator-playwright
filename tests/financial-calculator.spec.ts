import { test } from "@playwright/test";
import { FinancialCalculatorPage } from "../app/financialCalculatorPage";

test("should able to navigate to budget calculator page", async ({ page }) => {
  const financialCalculatorPage = new FinancialCalculatorPage(page);

  await financialCalculatorPage.goto();
  await financialCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await financialCalculatorPage.clickBudgetCalculatorPage();
});
