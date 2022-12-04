import { CourseDto } from "../dto/course-dto";
import { CourseDegree } from "../enums/course-degree";
import { EducationType } from "../enums/education-type";

export class CourseShortInfoModel {
  public number: number;
  public groupsNumber: number;
  public degree: CourseDegree;
  public professionId: number;
  public educationType: EducationType;

  constructor(dto: CourseDto) {
    this.number = dto.number;
    this.groupsNumber = dto.groupsNumber;
    this.degree = dto.degree;
    this.professionId = dto.profession.id;
    this.educationType = dto.educationType;
  }
}