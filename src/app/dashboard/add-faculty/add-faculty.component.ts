import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AddFacultyModel } from "src/app/core/models/add-faculty-model";
import { FacultiesService } from "../services/faculties.service";

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent {
  @ViewChild('form') form: NgForm;
  public newFaculty: AddFacultyModel = new AddFacultyModel();

  constructor(
    private readonly facultiesService: FacultiesService,
    private readonly router: Router
  ) {}

  public submit() {
    if (this.form.invalid)
      return;
    
    this.facultiesService.add(this.newFaculty).subscribe(() => {
      this.router.navigateByUrl('/dashboard/faculties');
    })
  }
}