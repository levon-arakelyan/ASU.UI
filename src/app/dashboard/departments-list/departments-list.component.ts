import { Component, OnInit } from "@angular/core";
import { DepartmentsService } from "../services/departments.service";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent {
  constructor(
    public departmentsService: DepartmentsService,
  ) {}
}