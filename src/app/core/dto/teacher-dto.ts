import { CourseSubjectDto } from "./course-subject-dto";
import { DepartmentDto } from "./department-dto";
import { DepartmentHeadDto } from "./department-head-dto";
import { FacultyHeadDto } from "./faculty-head";
import { ScheduleDto } from "./schedule-dto";
import { TeacherSubjectDto } from "./teacher-subject-dto";

export class TeacherDto {
  public id: number;
  public firstName: string;
  public lastName: string;
  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
  public email: string;
  public salary: number;
  public rate: number;
  public departmentId: number;
  public isFacultyHead: boolean;
  public isDepartmentHead: boolean;
  public department: DepartmentDto;
  public teacherSubjects: TeacherSubjectDto[];
  public courseSubjects: CourseSubjectDto[];
  public schedule: ScheduleDto[];
  public departmentHead: DepartmentHeadDto;
  public facultyHead: FacultyHeadDto;
}