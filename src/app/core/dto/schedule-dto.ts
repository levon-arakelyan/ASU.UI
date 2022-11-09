import { ClassNumber } from "../enums/class-number";
import { DayOfWeek } from "../enums/day-of-week";
import { StudentGroup } from "../enums/student-group";
import { AudienceDto } from "./audience-dto";
import { CourseDto } from "./course-dto";
import { SubjectDto } from "./subject-dto";
import { TeacherDto } from "./teacher-dto";

export class ScheduleDto {
  public id: number;
  public dayOfWeek: DayOfWeek;
  public classNumber: ClassNumber;
  public studentGroup: StudentGroup;
  public count: number;
  public course: CourseDto;
  public subject: SubjectDto;
  public audience: AudienceDto;
  public teacher: TeacherDto;
}