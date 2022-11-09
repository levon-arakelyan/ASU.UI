import { HttpHeaders } from "@angular/common/http";

export abstract class ApiBaseService {
  protected endpoint: string;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });
}