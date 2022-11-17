import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfessionDto } from "src/app/core/dto/profession-dto";
import { CourseDegree } from "src/app/core/enums/course-degree";
import { EducationType } from "src/app/core/enums/education-type";
import { AddCourseModel } from "src/app/core/models/add-course-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { CoursesService } from "../services/courses.service";
import { EnumHelper } from "../services/helpers/enum-helper";
import { ProfessionsService } from "../services/professions.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  @ViewChild('form') form: NgForm;
  public newCourse: AddCourseModel = new AddCourseModel();
  public professionsList: ProfessionDto[] = [];
  public degreesList: SelectItemModel[] = EnumHelper.parseToSelectItems(CourseDegree);
  public educationTypesList: SelectItemModel[] = EnumHelper.parseToSelectItems(EducationType);

  constructor(
    private readonly professionsService: ProfessionsService,
    private readonly coursesService: CoursesService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    console.log(this.degreesList)
    this.professionsService.getAll().subscribe(res => {
      this.professionsList = res;
    })
  }

  public submit() {
    if (this.form.invalid)
      return;
    
    this.coursesService.add(this.newCourse).subscribe(() => {
      this.router.navigateByUrl('/dashboard/courses')
    })
  }
}