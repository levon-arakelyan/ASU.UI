import { SubjectDto } from './subject-dto';

export class SubjectGroupDto {
  public id: number;
  public name: string;
  public subjects: SubjectDto[]
}