import { Operation } from "rfc6902";
import { Observable } from "rxjs";
import { CourseSubjectDto } from "../../dto/course-subject-dto";
import { AddCourseSubjectModel } from "../../models/add-course-subject-model";

export interface ICourseSubjectsService {
  add(courseSubjects: AddCourseSubjectModel[]): Observable<void>;
  getForCourse(courseId: number): Observable<CourseSubjectDto[]>;
  save(ids: number[], courseSubjects: Operation[]): Observable<void>;
}