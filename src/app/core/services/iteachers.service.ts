import { Observable } from "rxjs";
import { TeacherDto } from "../dto/teacher-dto";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";

export interface ITeachersService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<TeacherDto>>
}