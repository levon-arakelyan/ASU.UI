import { ScheduleClassType } from "../enums/schedule-class-type";
import { ScheduleClassModel } from "./schedule-class-model";

export class ScheduleClassGroupModel {
  public classType: ScheduleClassType = ScheduleClassType.Normal;
  public hasClasses: boolean = true;
  public classes: ScheduleClassModel[] = [];
}