import { Component } from "@angular/core";
import { FacultiesService } from "../services/faculties.service";

@Component({
  selector: 'app-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['./faculties-list.component.css']
})
export class FacultiesListComponent {
  constructor(
    public readonly facultiesService: FacultiesService
  ) {}
}