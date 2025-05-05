// src/types/mocEventType.ts
export type MocEventItem = {
  title?: string;
  link?: string;
  mobileImage?: string;
  desktopImage?: string;
};

export interface FetchMocEventResponse {
  data: MocEventItem;
}
