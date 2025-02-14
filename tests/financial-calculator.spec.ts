import { expect, test } from "@playwright/test";
import { FinancialCalculatorPage } from "../app/financialCalculatorPage";

test("should able to navigate to budget calculator page", async ({ page }) => {
  const financialCalculatorPage = new FinancialCalculatorPage(page);

  await financialCalculatorPage.segmentViewedScreen.listenSegmentViewedScreenEvent();

  await financialCalculatorPage.goto();
  await financialCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();
  await financialCalculatorPage.clickBudgetCalculatorPage();

  // Assert if view screen event is sent
  expect(financialCalculatorPage.segmentViewedScreen.isViewedScreenEventSent).toBe(true);
});
