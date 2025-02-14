import { expect, Locator, Page } from "@playwright/test";

export interface ICookNoticeBanner {
  clickAgreeCookieButton(): Promise<void>;
}

export class CookieNoticeBanner implements ICookNoticeBanner {
  readonly page: Page;
  readonly agreeCookieButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agreeCookieButton = page.locator("#onetrust-accept-btn-handler");
  }

  async clickAgreeCookieButton() {
    await expect(this.agreeCookieButton).toBeVisible();
    await this.agreeCookieButton.click();
    await expect(this.agreeCookieButton).not.toBeVisible();
  }
}
