import { Observable } from "rxjs";
import { CourseDto } from "../dto/course-dto";
import { AddCourseModel } from "../models/add-course-model";
import { PagedItemsList, PagedListOrder } from "../models/paged-list-model";

export interface ICoursesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<CourseDto>>
  getAll(): Observable<CourseDto[]>;
  add(course: AddCourseModel): Observable<void>;
}