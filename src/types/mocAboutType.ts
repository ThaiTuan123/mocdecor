// src/types/mocAboutType.ts
export type MocAboutItem = {
  title?: string;
  content?: string;
  image_1?: string;
  image_2?: string;
};

export interface FetchMocAboutResponse {
  data: MocAboutItem;
}
