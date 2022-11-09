import { OrderDirection } from "../enums/order-direction";

export interface IAdvancedListQueryParams {
  page: number;
  filter: string;
  orderBy: string;
  direction: OrderDirection
}