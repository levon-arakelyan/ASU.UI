import { Operation } from "rfc6902";
import { CourseDto } from "../dto/course-dto";

export class EditCourseModel {
  courseShortInfoPatch: Operation[];

  constructor(dto: CourseDto) {
    
  }
}