import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScheduleDto } from "src/app/core/dto/schedule-dto";
import { AddScheduleModel } from "src/app/core/models/add-schedule-model";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { SubjectForSchedule } from "src/app/core/models/subject-for-schedule.model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ISchedulesService } from "src/app/core/services/ischedules.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";

@Injectable()
export class SchedulesService extends ApiBaseService implements ISchedulesService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.endpoint = `${this.settings.serverUrl}schedules`
  }

  public generate(courseId: number, subjects: SubjectForSchedule[]): Observable<ScheduleDto[]> {
    return this.http.post<ScheduleDto[]>(`${this.endpoint}/generate/${courseId}`, subjects);
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ScheduleDto>> {
    return this.http.get<PagedItemsList<ScheduleDto>>(`${this.endpoint}/get-paged`, { params: {
      page,
      pageSize,
      orderBy: order.orderBy,
      direction: order.direction,
      filter,
    }});
  }

  public getForCourse(courseId: number): Observable<ScheduleDto[]> {
    return this.http.get<ScheduleDto[]>(`${this.endpoint}/get-for-course/${courseId}`);
  }
  
  public addForCourse(courseId: number, schedule: AddScheduleModel[]): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/add-for-course/${courseId}`, schedule); 
  }
}