import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ITeachersService } from "src/app/core/services/iteachers.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class TeachersService extends ApiBaseService implements ITeachersService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}teachers`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<TeacherDto>> {
    return this.http.get<PagedItemsList<TeacherDto>>(this.endpoint, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      orderDirection: order.direction,
      filter,
    }});
  }
}