import { ClassNumber } from "../enums/class-number";
import { DayOfWeek } from "../enums/day-of-week";

export class AddScheduleModel {
  public dayOfWeek: DayOfWeek;
  public classNumber: ClassNumber;
  public subjectId: number;
  public audienceId: number;
  public teacherId: number;
}