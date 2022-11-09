import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { IDepartmentsService } from "src/app/core/services/idepartments.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class DepartmentsService extends ApiBaseService implements IDepartmentsService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}departments`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<DepartmentDto>> {
    return this.http.get<PagedItemsList<DepartmentDto>>(this.endpoint, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      orderDirection: order.direction,
      filter,
    }});
  }
}