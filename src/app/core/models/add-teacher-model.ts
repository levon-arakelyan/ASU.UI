import { TeacherDegree } from "../enums/teacher-degree";

export class AddTeacherModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public degree: TeacherDegree;
  public rate: number;
  public departmentId: number;
  public isDepartmentHead: boolean;
  public isFacultyHead: boolean;
  public subjectsIds: number[] = []
}