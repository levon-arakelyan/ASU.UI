import { StudentGroup } from "../enums/student-group";
import { CourseDto } from "./course-dto";
import { StudentSubjectDto } from "./student-subject-dto";

export class StudentDto {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public group: StudentGroup;
  public course: CourseDto;
  public studentSubjects: StudentSubjectDto[];
}