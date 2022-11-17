import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { AddProfessionModel } from "src/app/core/models/add-profession-model";
import { DepartmentsService } from "../services/departments.service";
import { ProfessionsService } from "../services/professions.service";

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.css']
})
export class AddProfessionComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public departmentsList: DepartmentDto[] = [];
  public newProfession: AddProfessionModel = new AddProfessionModel();

  constructor(
    private readonly professionsService: ProfessionsService,
    private readonly departmentsService: DepartmentsService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.departmentsService.getAll().subscribe(res => {
      this.departmentsList = res;
    })  
  }

  public submit() {
    if (this.form.invalid)
      return;
    
    this.professionsService.add(this.newProfession).subscribe(() => {
      this.router.navigateByUrl('/dashboard/professions');
    })
  }
}