import { DepartmentDto } from "./department-dto";
import { TeacherDto } from "./teacher-dto";

export class DepartmentHeadDto {
  public id: number;
  public department: DepartmentDto;
  public head: TeacherDto;
}