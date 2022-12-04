import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AudienceType } from "src/app/core/enums/audience-type";
import { AddAudienceModel } from "src/app/core/models/add-audience-model";
import { AudienciesService } from "../services/audiencies.service";
import { EnumHelper } from "../services/helpers/enum-helper";

@Component({
  selector: 'app-add-audience',
  templateUrl: './add-audience.component.html',
  styleUrls: ['./add-audience.component.css']
})
export class AddAudienceComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public newAudience: AddAudienceModel = new AddAudienceModel();
  public audienciesTypes = EnumHelper.parseToSelectItems(AudienceType);
  public loading: boolean = false;
  public faSpinner = faSpinner;

  constructor(
    private readonly audienciesService: AudienciesService,
    private readonly router: Router
  ){ }

  public ngOnInit(): void {
  }

  public submit(): void {
    if (this.form.invalid)
      return;

    this.loading = true
    this.audienciesService.add(this.newAudience).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard/audiencies');
        this.loading = false
      },
      error: () => {
        this.loading = false
      }});
  }
}