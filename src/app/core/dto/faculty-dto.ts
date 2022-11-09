import { DepartmentDto } from "./department-dto";
import { FacultyHeadDto } from "./faculty-head";

export class FacultyDto {
  public id: number;
  public name: string
  public departments: DepartmentDto[];
  public facultyHead: FacultyHeadDto[]
}