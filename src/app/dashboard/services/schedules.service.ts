import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScheduleDto } from "src/app/core/dto/schedule-dto";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { ScheduleClassGroupModel } from "src/app/core/models/schedule-class-group-model";
import { ScheduleEditableClassGroupModel } from "src/app/core/models/schedule-editable-class-group-model";
import { ApiBaseService } from "src/app/core/services/api-base-service";
import { ISchedulesService } from "src/app/core/services/interfaces/ischedules.service";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable()
export class SchedulesService extends ApiBaseService implements ISchedulesService {
  constructor(
    private readonly http: HttpService,
    private readonly settings: AppSettingsService
  ) {
    super();
    this.endpoint = `${this.settings.serverUrl}schedules`
  }

  public getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ScheduleDto>> {
    return this.http.get<PagedItemsList<ScheduleDto>>(`${this.endpoint}/get-paged?${this.createGetPagedQuery(filter, page, pageSize, order)}`);
  }

  public getScheduleForCourse(courseId: number): Observable<ScheduleDto[]> {
    return this.http.get<ScheduleDto[]>(`${this.endpoint}/get-for-course/${courseId}`);
  }

  public getRegularScheduleForCourse(courseId: number): Observable<ScheduleClassGroupModel[][]> {
    return this.http.get<ScheduleClassGroupModel[][]>(`${this.endpoint}/get-regular-for-course/${courseId}`);
  }

  public getEditableScheduleForCourse(courseId: number): Observable<ScheduleEditableClassGroupModel[][]> {
    return this.http.get<ScheduleEditableClassGroupModel[][]>(`${this.endpoint}/get-editable-for-course/${courseId}`);

  }

  public saveScheduleForCourse(courseId: number, schedule: ScheduleEditableClassGroupModel[][]): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/save-for-course/${courseId}`, schedule); 
  }

  public deleteScheduleForCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/delete-for-course/${courseId}`); 
  }
}