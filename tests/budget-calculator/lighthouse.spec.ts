import test from "@playwright/test";
import playwright from 'playwright';
import { playAudit } from 'playwright-lighthouse';
import { BudgetCalculatorPage } from "../../app/budgetCalculatorPage";

test("Lighthouse scoring should be above threshold", async ({ browserName }) => {
  test.skip(browserName === 'webkit', 'Test not supported on Safari Mobile');
  const browser = await playwright['chromium'].launch({
    args: ['--remote-debugging-port=9222'],
  });
  const page = await browser.newPage();


  const budgetCalculatorPage = new BudgetCalculatorPage(page);
  await budgetCalculatorPage.goto();

  await playAudit({
    page: page,
    port: 9222,
    thresholds: {
      performance: 50,
      accessibility: 50,
      'best-practices': 50,
      seo: 50,
      pwa: 50,
    },
  });
})