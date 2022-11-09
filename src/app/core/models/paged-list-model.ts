import { OrderDirection } from "../enums/order-direction";

export class PagedItemsList<T> {
  public page: number;
  public pageSize: number;
  public totalRecords: number;
  public data: T[];
  public order: PagedListOrder;

  constructor(page: number, pageSize: number, order: PagedListOrder) {
    this.page = page;
    this.pageSize = pageSize;
    this.order = order;
  }
}

export class PagedListOrder {
  public orderBy: string;
  public direction: OrderDirection;

  constructor(orderBy: string, direction: OrderDirection) {
    this.orderBy = orderBy;
    this.direction = direction;
  }
}