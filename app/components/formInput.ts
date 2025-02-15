import { expect, Locator, Page } from "@playwright/test";

export interface IFormInput {
  type(text: string): Promise<void>;
  getErrorMessage(): Locator;
};

export class FormInput implements IFormInput {
  readonly input: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page, name: string) {
    this.input = page.locator(`#floating_label_input_${name}`);
    this.errorMessage = page.getByTestId(`${name}-error`);
  }

  async type(text: string) {
    await expect(this.input).not.toBeDisabled();
    this.input.fill(text);
  };

  getErrorMessage() {
    return this.errorMessage
  }
}