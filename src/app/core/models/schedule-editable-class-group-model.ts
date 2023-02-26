import { ScheduleClassType } from "../enums/schedule-class-type";
import { ScheduleEditableClassModel } from "./schedule-editable-class-model";

export class ScheduleEditableClassGroupModel {
  public classType: ScheduleClassType = ScheduleClassType.Normal;
  public classes: ScheduleEditableClassModel[] = [new ScheduleEditableClassModel()];
}