import { expect, Locator, Page } from "@playwright/test";
import { FormInput, IFormInput } from "./components/formInput";
import { ISegmentViewedScreen, SegmentViewedScreen } from "./analytics/segmentViewedScreen";

export interface IBudgetCalculatorPage {
  segmentViewedScreen: ISegmentViewedScreen;
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
    public segmentViewedScreen = new SegmentViewedScreen(page, "Budget Calculator")
  ) {
    this.page = page;

    this.takeHomeIncomeInput = new FormInput(page, "income");
    this.zipCodeInput = new FormInput(page, "zipcode");

    this.calculateBudgetButton = page.getByTestId("calculate-button");

    this.expenseBudgetContent = page.getByTestId("expense-insights-result-content");
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
