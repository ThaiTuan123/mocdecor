export interface FetchMocCustomerResponse {
  customers: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }>;
  total: number;
}
