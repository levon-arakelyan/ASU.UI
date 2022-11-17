import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { SubjectGroupDto } from "src/app/core/dto/subject-group-dto";
import { AddSubjectGroupModel } from "src/app/core/models/add-subject-group-model";
import { AddSubjectModel } from "src/app/core/models/add-subject-model";
import { SubjectGroupsService } from "../services/subject-groups.service";
import { SubjectsService } from "../services/subjects.service";

@Component({
  selector: 'app-add-subject-group',
  templateUrl: './add-subject-group.component.html',
  styleUrls: ['./add-subject-group.component.css']
})
export class AddSubjectGroupComponent {
  @ViewChild('form') form: NgForm;
  public newSubjectGroup: AddSubjectGroupModel = new AddSubjectGroupModel();

  constructor(
    private readonly subjectGroupsService: SubjectGroupsService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
  }

  public submit(): void {
    if (this.form.invalid)
      return;

    this.subjectGroupsService.add(this.newSubjectGroup).subscribe(() => {
      this.router.navigateByUrl('/dashboard/subject-groups');
    });
  }
}