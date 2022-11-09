import { OrderDirection } from "../enums/order-direction";

export interface IPagedListSettings {
  defaultPage: number;
  defaultPageSize: number,
  defaultOrderBy: string,
  defaultOrderDirection: OrderDirection;
}