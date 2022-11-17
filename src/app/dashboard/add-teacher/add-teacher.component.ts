import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { AddTeacherModel } from "src/app/core/models/add-teacher-model";
import { DepartmentsService } from "../services/departments.service";
import { TeachersService } from "../services/teachers.service";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public newTeacher: AddTeacherModel = new AddTeacherModel();
  public departmentsList: DepartmentDto[] = [];

  constructor(
    private readonly departmentsService: DepartmentsService,
    public readonly teachersService: TeachersService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.departmentsService.getAll().subscribe(res => {
      this.departmentsList = res;
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