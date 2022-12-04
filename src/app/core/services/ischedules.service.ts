import { Observable } from "rxjs";
import { ScheduleDto } from "../dto/schedule-dto";
import { AddScheduleModel } from "../models/add-schedule-model";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";
import { SubjectForSchedule } from "../models/subject-for-schedule.model";

export interface ISchedulesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ScheduleDto>>;
  getForCourse(courseId: number): Observable<ScheduleDto[]>;
  addForCourse(courseId: number, schedule: AddScheduleModel[]): Observable<void>;
  generate(courseId: number, subjects: SubjectForSchedule[]): Observable<ScheduleDto[]>;
}