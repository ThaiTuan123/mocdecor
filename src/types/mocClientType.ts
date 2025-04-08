// src/types/mocClientType.ts
export type MocClientItem = {
  name?: string;
  image?: string;
};

export interface FetchMocClientResponse {
  data: MocClientItem[];
}
