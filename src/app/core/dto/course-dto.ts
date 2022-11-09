import { CourseSubjectDto } from "./course-subject-dto";
import { ProfessionDto } from "./profession-dto";
import { ScheduleDto } from "./schedule-dto";
import { StudentDto } from "./student-dto";
import { StudentSubjectDto } from "./student-subject-dto";

export class CourseDto {
  public id: number;
  public number: number;
  public groupsNumber: number;
  public profession: ProfessionDto;
  public students: StudentDto[]
  public courseSubjects: CourseSubjectDto[];
  public schedule: ScheduleDto[]
  public studentSubjects: StudentSubjectDto[];
}