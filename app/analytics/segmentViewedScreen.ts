import { Page } from "@playwright/test";
import { SegmentEvent } from "../../types/segment";

export interface ISegmentViewedScreen {
  listenSegmentViewedScreenEvent(): Promise<void>;
};

export class SegmentViewedScreen implements ISegmentViewedScreen {
  isViewedScreenEventSent: boolean;
  readonly page: Page;
  readonly targetScreenName: string;

  constructor(page: Page, targetScreenName: string) {
    this.page = page;
    this.isViewedScreenEventSent = false;
    this.targetScreenName = targetScreenName;
  }

  async listenSegmentViewedScreenEvent() {
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
