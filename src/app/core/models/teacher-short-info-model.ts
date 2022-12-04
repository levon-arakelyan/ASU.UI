import { TeacherDto } from "../dto/teacher-dto";
import { TeacherDegree } from "../enums/teacher-degree";

export class TeacherShortInfoModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public degree: TeacherDegree;
  public departmentId: number;
  public rate: number;

  constructor(dto: TeacherDto) {
    this.id = dto.id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.degree = dto.degree;
    this.departmentId = dto.department.id;
    this.rate = dto.rate;
  }
}