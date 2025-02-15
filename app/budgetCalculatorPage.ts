import { expect, Locator, Page } from "@playwright/test";
import { FormInput, IFormInput } from "./components/formInput";
import { IUserViewedScreen, UserViewedScreen } from "./analytics/userViewedScreen";
import { CookieNoticeBanner, ICookNoticeBanner } from "./components/cookieNoticeBanner";

export interface IBudgetCalculatorPage {
  userViewedScreen: IUserViewedScreen;
  cookieNoticeBanner: ICookNoticeBanner;
  goto(): Promise<void>;
  typeTakeHomeIncomeInput(text: string): Promise<void>;
  typeZipCodeInput(text: string): Promise<void>;
  submitForm(): Promise<void>;
}

export class BudgetCalculatorPage implements IBudgetCalculatorPage {
  readonly page: Page;

  readonly takeHomeIncomeInput: IFormInput;
  readonly zipCodeInput: IFormInput;

  readonly calculateBudgetButton: Locator;

  readonly expenseBudgetContent: Locator;

  constructor(
    page: Page,
    public cookieNoticeBanner = new CookieNoticeBanner(page),
    public userViewedScreen = new UserViewedScreen(page, "Budget Calculator")
  ) {
    this.page = page;

    this.takeHomeIncomeInput = new FormInput(page, "income");
    this.zipCodeInput = new FormInput(page, "zipcode");

    this.calculateBudgetButton = page.getByTestId("calculate-button");

    this.expenseBudgetContent = page.getByTestId("expense-insights-result-content");
  }

  async goto() {
    await this.page.goto("https://www.earnin.com/financial-tools/budget-calculator");
  }

  async typeTakeHomeIncomeInput(text: string) {
    await this.takeHomeIncomeInput.type(text);
  }

  async typeZipCodeInput(text: string){
    await this.zipCodeInput.type(text);
  }

  async submitForm() {
    await expect(this.calculateBudgetButton).not.toBeDisabled();
    await this.calculateBudgetButton.click();
  }
}
