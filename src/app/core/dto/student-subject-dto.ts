import { CourseDto } from "./course-dto";
import { StudentDto } from "./student-dto";
import { SubjectDto } from "./subject-dto";

export class StudentSubjectDto {
  public id: number;
  public mark?: number
  public student: StudentDto;
  public subject: SubjectDto;
  public course: CourseDto;
}