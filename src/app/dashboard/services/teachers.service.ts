import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { AddTeacherModel } from "src/app/core/models/add-teacher-model";
import { EditTeacherModel } from "src/app/core/models/edit-teacher-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ITeachersService } from "src/app/core/services/interfaces/iteachers.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class TeachersService extends ApiBaseService implements ITeachersService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}teachers`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<TeacherDto>> {
    return this.http.get<PagedItemsList<TeacherDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
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

  public getBySubject(scheduleId: number): Observable<TeacherDto[]> {
    return this.http.get(`${this.endpoint}/get-by-subject/${scheduleId}`);
  }

  public getAll(): Observable<TeacherDto[]> {
    return this.http.get(`${this.endpoint}/get-all`);
  }
}