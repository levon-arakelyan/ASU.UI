import { Observable } from "rxjs";
import { ScheduleDto } from "../../dto/schedule-dto";
import { AddScheduleModel } from "../../models/add-schedule-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";
import { ScheduleClassGroupModel } from "../../models/schedule-class-group-model";
import { ScheduleEditableClassGroupModel } from "../../models/schedule-editable-class-group-model";
import { SubjectForSchedule } from "../../models/subject-for-schedule.model";

export interface ISchedulesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<ScheduleDto>>;
  getScheduleForCourse(courseId: number): Observable<ScheduleDto[]>;
  getRegularScheduleForCourse(courseId: number): Observable<ScheduleClassGroupModel[][]>;
  getEditableScheduleForCourse(courseId: number): Observable<ScheduleEditableClassGroupModel[][]>;
  saveScheduleForCourse(courseId: number, schedule: ScheduleEditableClassGroupModel[][]): Observable<void>;
  deleteScheduleForCourse(courseId: number): Observable<void>;
}