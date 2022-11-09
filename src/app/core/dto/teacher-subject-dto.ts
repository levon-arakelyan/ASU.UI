import { SubjectDto } from "./subject-dto";
import { TeacherDto } from "./teacher-dto";

export class TeacherSubjectDto {
  public id: number;
  public teacher: TeacherDto;
  public Subject: SubjectDto;
}