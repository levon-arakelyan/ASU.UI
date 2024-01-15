import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { TeacherDegree } from "src/app/core/enums/teacher-degree";
import { AddTeacherModel } from "src/app/core/models/add-teacher-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { DepartmentsService } from "../services/departments.service";
import { EnumHelper } from "../services/helpers/enum-helper";
import { TeachersService } from "../services/teachers.service";
import { SubjectDto } from "src/app/core/dto/subject-dto";
import { SubjectsService } from "../services/subjects.service";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public newTeacher: AddTeacherModel = new AddTeacherModel();
  public departmentsList: DepartmentDto[] = [];
  public degreesList: SelectItemModel[] = EnumHelper.parseToSelectItems(TeacherDegree);
  public subjectsList: SubjectDto[] = [];

  constructor(
    private readonly departmentsService: DepartmentsService,
    public readonly teachersService: TeachersService,
    public readonly subjectsService: SubjectsService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.departmentsService.getAll().subscribe(res => {
      this.departmentsList = res;
    });
    this.subjectsService.getAll().subscribe(res => {
      this.subjectsList = res;
    })
  }

  public submit(): void {
    if (this.form.invalid)
      return;

    this.teachersService.add(this.newTeacher).subscribe(() => {
      this.router.navigateByUrl('/dashboard/teachers');
    });
  }
}