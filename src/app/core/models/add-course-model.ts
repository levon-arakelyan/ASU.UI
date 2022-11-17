import { CourseDegree } from "../enums/course-degree";
import { EducationType } from "../enums/education-type";

export class AddCourseModel {
  public number: number;
  public professionId: number;
  public groupsNumber: number;
  public degree: CourseDegree;
  public educationType: EducationType;
}