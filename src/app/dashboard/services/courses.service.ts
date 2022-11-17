import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseDto } from "src/app/core/dto/course-dto";
import { AddCourseModel } from "src/app/core/models/add-course-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ICoursesService } from "src/app/core/services/icourses.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class CoursesService extends ApiBaseService implements ICoursesService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}courses`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<CourseDto>> {
    return this.http.get<PagedItemsList<CourseDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public getAll(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${this.endpoint}/all`);
  }

  public add(course: AddCourseModel): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add`, course); 
  }
}