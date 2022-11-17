import { Component } from "@angular/core";
import { ProfessionsService } from "../services/professions.service";

@Component({
  selector: 'app-professions-list',
  templateUrl: './professions-list.component.html',
  styleUrls: ['./professions-list.component.css']
})
export class ProfessionsListComponent {
  constructor(
    public readonly professionsService: ProfessionsService
  ) {}
}