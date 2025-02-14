export type SegmentEventProperties = {
  browserName: string
  browserVersion: string
  osName: string
  deviceModel: string
  deviceVendor: string
  osVersion: string
  isMobile: boolean
  viewportHeight: number
  viewportWidth: number
  viewportOrientation: string
  url: string
  websitePage: string
  screenName: string
};

export type SegmentEvent = {
  event: string;
  properties: SegmentEventProperties;
}
