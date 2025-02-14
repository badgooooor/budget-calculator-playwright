import { expect, Locator, Page } from "@playwright/test";
import { CookieNoticeBanner, ICookNoticeBanner } from "./components/cookieNoticeBanner";

interface IFinancialCalculatorPage {
  cookieNoticeBanner: ICookNoticeBanner;
  clickBudgetCalculatorPage(): Promise<void>;
}

export class FinancialCalculatorPage implements IFinancialCalculatorPage {
  readonly page: Page;
  readonly budgetCalculatorLinkDiv: Locator;

  constructor(
    page: Page,
    public cookieNoticeBanner = new CookieNoticeBanner(page)
  ) {
    this.page = page;
    this.budgetCalculatorLinkDiv = page.getByTestId(
      "financial-calculator-Budget calculator-card"
    );
  }

  async goto() {
    await this.page.goto("https://www.earnin.com/financial-calculators");
  }

  async clickBudgetCalculatorPage() {
    await expect(this.budgetCalculatorLinkDiv).toBeVisible();
    await this.budgetCalculatorLinkDiv.click();

    await this.page.waitForURL("**/financial-tools/budget-calculator");
  }
}
