import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AddSubjectModel } from "src/app/core/models/add-subject-model";
import { SubjectsService } from "../services/subjects.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {
  @ViewChild('form') form: NgForm;
  public newSubject: AddSubjectModel = new AddSubjectModel();

  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    if (this.form.invalid)
      return;

    this.subjectsService.add(this.newSubject).subscribe(() => {
      this.router.navigateByUrl('/dashboard/subjects');
    });
  }
}