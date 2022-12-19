import { Observable } from "rxjs";
import { CourseDto } from "../../dto/course-dto";
import { AddCourseModel } from "../../models/add-course-model";
import { EditCourseModel } from "../../models/edit-course-model";
import { PagedItemsList, PagedListOrder } from "../../models/paged-list-model";

export interface ICoursesService {
  getPaged(filter: string, page: number, pageSize: number, order: PagedListOrder): Observable<PagedItemsList<CourseDto>>
  getAll(): Observable<CourseDto[]>;
  add(course: AddCourseModel): Observable<void>;
  get(courseId: number): Observable<CourseDto>;
  edit(courseId: number, editModel: EditCourseModel): Observable<void>;
}