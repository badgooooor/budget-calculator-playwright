import { Page } from "@playwright/test";
import { SegmentEvent } from "../../types/segment";

export interface IUserViewedScreen {
  listenUserViewedScreenEvent(): Promise<void>;
};

export class UserViewedScreen implements IUserViewedScreen {
  isViewedScreenEventSent: boolean;
  readonly page: Page;
  readonly targetScreenName: string;

  constructor(page: Page, targetScreenName: string) {
    this.page = page;
    this.isViewedScreenEventSent = false;
    this.targetScreenName = targetScreenName;
  }

  async listenUserViewedScreenEvent() {
    await this.page.route('https://api.segment.io/v1/t', async (route) => {
      const bodyString = route.request().postData();

      if (bodyString === null) return route.continue();
      const body: SegmentEvent = JSON.parse(bodyString);

      if (body.event === "User viewed screen" && body.properties.screenName === this.targetScreenName) {
        this.isViewedScreenEventSent = true;
      }

      return route.continue();
    })
  }
}
