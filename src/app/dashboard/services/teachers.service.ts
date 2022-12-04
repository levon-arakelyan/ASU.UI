import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Operation } from "rfc6902";
import { Observable } from "rxjs";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { AddTeacherModel } from "src/app/core/models/add-teacher-model";
import { EditTeacherModel } from "src/app/core/models/edit-teacher-model";
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
    return this.http.get<PagedItemsList<TeacherDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public add(department: AddTeacherModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, department); 
  }

  public get(teacherId: number): Observable<TeacherDto> {
    return this.http.get<TeacherDto>(`${this.endpoint}/${teacherId}`);
  }

  public edit(teacherId: number, editModel: EditTeacherModel): Observable<void> {
    return this.http.patch<void>(`${this.endpoint}/edit/${teacherId}`, editModel);
  }
}