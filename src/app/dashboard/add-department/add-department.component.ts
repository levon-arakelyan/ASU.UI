import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FacultyDto } from "src/app/core/dto/faculty-dto";
import { AddDepartmentModel } from "src/app/core/models/add-department-model";
import { DepartmentsService } from "../services/departments.service";
import { FacultiesService } from "../services/faculties.service";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public newDepartment: AddDepartmentModel = new AddDepartmentModel();
  public faculties: FacultyDto[] = [];

  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly facultiesService: FacultiesService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.facultiesService.getAll().subscribe(res => {
      // this.faculties = res.body;
    })
  }

  public submit() {
    if (this.form.invalid)
      return;
    
    this.departmentsService.add(this.newDepartment).subscribe(() => {
      this.router.navigateByUrl('/dashboard/departments')
    })
  }
}