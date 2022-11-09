import { ScheduleDto } from "./schedule-dto";

export class AudienceDto {
  public id: number;
  public number: number;
  public hasComputers: boolean;
  public hasProjector: boolean;
  public hasBlackboard: boolean;
  public Schedule: ScheduleDto;
}