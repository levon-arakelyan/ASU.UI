import { FacultyDto } from "./faculty-dto";
import { TeacherDto } from "./teacher-dto";

export class FacultyHeadDto {
  public id: number;
  public faculty: FacultyDto;
  public head: TeacherDto;
}