import { Component } from "@angular/core";
import { SubjectGroupsService } from "../services/subject-groups.service";

@Component({
  selector: 'app-subject-groups-list',
  templateUrl: './subject-groups-list.component.html',
  styleUrls: ['./subject-groups-list.component.css']
})
export class SubjectGroupsListComponent {
  constructor(
    public readonly subjectGroupsService: SubjectGroupsService
  ) {}
}