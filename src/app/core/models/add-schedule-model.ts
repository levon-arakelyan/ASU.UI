import { ClassNumber } from "../enums/class-number";
import { DayOfWeek } from "../enums/day-of-week";
import { StudentGroup } from "../enums/student-group";

export class AddScheduleModel {
  public dayOfWeek: DayOfWeek;
  public classNumber: ClassNumber;
  public subjectId: number;
  public audienceId: number;
  public teacherId: number;
  public courseId: number;
  public isFractionAbove: boolean;
  public studentGroup: StudentGroup;
}