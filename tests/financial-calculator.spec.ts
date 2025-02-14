import { expect, test } from "@playwright/test";
import { FinancialCalculatorPage } from "../app/financialCalculatorPage";

test("should able to navigate to budget calculator page", async ({ page }) => {
  const financialCalculatorPage = new FinancialCalculatorPage(page);

  await financialCalculatorPage.userViewedScreen.listenUserViewedScreenEvent();

  await financialCalculatorPage.goto();
  await financialCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await financialCalculatorPage.clickBudgetCalculatorPage();

  // Assert if view screen event is sent
  expect(financialCalculatorPage.userViewedScreen.isViewedScreenEventSent).toBe(true);
});
