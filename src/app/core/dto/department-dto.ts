import { DepartmentHeadDto } from "./department-head-dto";
import { FacultyDto } from "./faculty-dto";
import { ProfessionDto } from "./profession-dto";
import { TeacherDto } from "./teacher-dto";

export class DepartmentDto {
  public id: number;
  public name: string;
  public faculty: FacultyDto;
  public professions: ProfessionDto[];
  public teachers: TeacherDto[];
  public departmentHead: DepartmentHeadDto;
}