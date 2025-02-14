import { expect, Locator, Page } from "@playwright/test";
import { CookieNoticeBanner, ICookNoticeBanner } from "./components/cookieNoticeBanner";
import { IUserViewedScreen, UserViewedScreen } from "./analytics/userViewedScreen";

interface IFinancialCalculatorPage {
  cookieNoticeBanner: ICookNoticeBanner;
  userViewedScreen: IUserViewedScreen;
  clickBudgetCalculatorPage(): Promise<void>;
}

export class FinancialCalculatorPage implements IFinancialCalculatorPage {
  readonly page: Page;
  readonly budgetCalculatorLinkDiv: Locator;

  constructor(
    page: Page,
    public cookieNoticeBanner = new CookieNoticeBanner(page),
    public userViewedScreen = new UserViewedScreen(page, "Website EarnIn dotcom - Financial Calculators Page")
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
