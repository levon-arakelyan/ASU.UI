import { Component } from "@angular/core";
import { SubjectsService } from "../services/subjects.service";

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent {
  constructor(
    public readonly subjectsService: SubjectsService
  ) {}
}