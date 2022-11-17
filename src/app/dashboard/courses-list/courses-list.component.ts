import { Component } from "@angular/core";
import { CourseDegree } from "src/app/core/enums/course-degree";
import { EducationType } from "src/app/core/enums/education-type";
import { CoursesService } from "../services/courses.service";
import { EnumHelper } from "../services/helpers/enum-helper";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  public courseDegrees = EnumHelper.parseToValuesArray(CourseDegree);
  public educationTypes = EnumHelper.parseToValuesArray(EducationType);
  constructor(public readonly coursesService: CoursesService) {}
}