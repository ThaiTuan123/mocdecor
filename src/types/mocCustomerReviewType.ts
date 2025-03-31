// src/types/mocCustomerReviewType.ts
export type MocCustomerReviewItem = {
  name?: string;
  image?: string;
  message?: string;
};

export interface FetchMocCustomerReviewResponse {
  data: MocCustomerReviewItem[];
}
