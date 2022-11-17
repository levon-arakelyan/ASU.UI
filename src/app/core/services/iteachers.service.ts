import { Observable } from "rxjs";
import { TeacherDto } from "../dto/teacher-dto";
import { AddTeacherModel } from "../models/add-teacher-model";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";

export interface ITeachersService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<TeacherDto>>;
  add(department: AddTeacherModel): Observable<void>;
  get(teacherId: number): Observable<TeacherDto>;
}