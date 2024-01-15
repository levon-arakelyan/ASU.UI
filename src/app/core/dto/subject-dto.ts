import { CourseDto } from "./course-dto";
import { CourseSubjectDto } from "./course-subject-dto";
import { ScheduleDto } from "./schedule-dto";
import { StudentSubjectDto } from "./student-subject-dto";
import { TeacherSubjectDto } from "./teacher-subject-dto";

export class SubjectDto {
  public id: number;
  public name: string;
  public course: CourseDto;
  public courseSubjects: CourseSubjectDto[];
  public studentSubjects: StudentSubjectDto[];
  public teacherSubjects: TeacherSubjectDto[];
  public schedule: ScheduleDto[];
}