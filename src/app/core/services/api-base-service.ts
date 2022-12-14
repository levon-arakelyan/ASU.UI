import { HttpHeaders } from "@angular/common/http";
import { PagedListOrder } from "../models/paged-list-model";

export abstract class ApiBaseService {
  protected endpoint: string;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  protected createGetPagedQuery(filter: string, page: number, pageSize: number, order: PagedListOrder) {
    return `page=${page}&pageSize=${pageSize}&orderBy=${order.orderBy}&direction=${order.direction}&filter=${filter}`;
  }
}