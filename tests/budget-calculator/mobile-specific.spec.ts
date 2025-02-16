import test, { expect } from "@playwright/test";
import { BudgetCalculatorPage } from '../../app/budgetCalculatorPage';

test.use({
  viewport: {
    width: 320,
    height: 528
  }
});

const aboutContentString = [
  'Enter take-home household income',
  'Enter your ZIP code',
  'Get your results'
];

test("should able to expand info in mobile device", async ({ page }) => {
  const budgetCalculatorPage = new BudgetCalculatorPage(page);

  await budgetCalculatorPage.goto();

  await budgetCalculatorPage.cookieNoticeBanner.clickAgreeCookieButton();

  await budgetCalculatorPage.clickExpandAboutButton();

  // Check content is visible since about has 3 bullet points.
  const itemCount = await budgetCalculatorPage.aboutContent.count();
  expect(itemCount).toBe(3);

  await expect(budgetCalculatorPage.aboutContent).toHaveText(aboutContentString);
});
