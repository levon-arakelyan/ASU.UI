import { CourseDegree } from "../enums/course-degree";
import { EducationType } from "../enums/education-type";
import { CourseSubjectDto } from "./course-subject-dto";
import { ProfessionDto } from "./profession-dto";
import { ScheduleDto } from "./schedule-dto";
import { StudentDto } from "./student-dto";
import { StudentSubjectDto } from "./student-subject-dto";

export class CourseDto {
  public id: number;
  public number: number;
  public groupsNumber: number;
  public degree: CourseDegree;
  public educationType: EducationType;
  public profession: ProfessionDto;
  public students: StudentDto[]
  public courseSubjects: CourseSubjectDto[];
  public schedule: ScheduleDto[]
  public studentSubjects: StudentSubjectDto[];
  public get courseName(): string {
    return this.profession.name + ' ' + this.number;
  }
}