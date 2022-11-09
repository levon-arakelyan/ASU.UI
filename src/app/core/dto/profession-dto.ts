import { CourseDto } from "./course-dto";
import { DepartmentDto } from "./department-dto";

export class ProfessionDto {
  public id: number;
  public name: string;
  public department: DepartmentDto;
  public courses: CourseDto[];
}