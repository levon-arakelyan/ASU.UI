import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseDto } from "src/app/core/dto/course-dto";
import { AddCourseModel } from "src/app/core/models/add-course-model";
import { EditCourseModel } from "src/app/core/models/edit-course-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ICoursesService } from "src/app/core/services/interfaces/icourses.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class CoursesService extends ApiBaseService implements ICoursesService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}courses`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<CourseDto>> {
    return this.http.get<PagedItemsList<CourseDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
  }

  public getAll(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${this.endpoint}/all`);
  }

  public get(courseId: number): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${this.endpoint}/${courseId}`);
  }

  public add(course: AddCourseModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, course); 
  }

  public edit(courseId: number, editModel: EditCourseModel): Observable<void> {
    return this.http.patch<void>(`${this.endpoint}/edit/${courseId}`, editModel);
  }
}