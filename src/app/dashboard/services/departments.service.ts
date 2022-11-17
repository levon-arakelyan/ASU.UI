import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { AddDepartmentModel } from "src/app/core/models/add-department-model";
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
    return this.http.get<PagedItemsList<DepartmentDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public getAll(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(`${this.endpoint}/all`)
  }

  public add(department: AddDepartmentModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, department);
  }
}