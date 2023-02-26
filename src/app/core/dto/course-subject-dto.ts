import { CourseDto } from "./course-dto";
import { SubjectDto } from "./subject-dto";

export class CourseSubjectDto {
  public id: number;
  public credit: number;
  public course: CourseDto;
  public subject: SubjectDto;
}