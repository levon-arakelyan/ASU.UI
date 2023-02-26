import { AudienceType } from "../enums/audience-type";
import { ScheduleDto } from "./schedule-dto";

export class AudienceDto {
  public id: number;
  public number: number;
  public type: AudienceType;
  public schedule: ScheduleDto;
}