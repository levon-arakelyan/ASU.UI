import { CourseDto } from "./course-dto";
import { SubjectDto } from "./subject-dto";
import { TeacherDto } from "./teacher-dto";

export class CourseSubjectDto {
  public id: number;
  public credit: number;
  public course: CourseDto;
  public subject: SubjectDto;
  public teacher: TeacherDto;
}