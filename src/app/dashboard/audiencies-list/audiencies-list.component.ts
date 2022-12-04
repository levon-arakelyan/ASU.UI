import { Component } from "@angular/core";
import { AudienceType } from "src/app/core/enums/audience-type";
import { AudienciesService } from "../services/audiencies.service";
import { EnumHelper } from "../services/helpers/enum-helper";

@Component({
  selector: 'app-audiencies-list',
  templateUrl: './audiencies-list.component.html',
  styleUrls: ['./audiencies-list.component.css']
})
export class AudienciesListComponent {
  public audienciesTypes = EnumHelper.parseToValuesArray(AudienceType);

  constructor(public readonly audienciesService: AudienciesService) {}
}