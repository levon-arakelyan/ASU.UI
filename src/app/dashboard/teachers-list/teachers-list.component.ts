import { Component, OnInit } from "@angular/core";
import { TeachersService } from "../services/teachers.service";
import { faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Router } from "@angular/router";

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent {
  public faInfoCircle = faInfoCircle;
  public faPencilAlt = faPencilAlt;

  constructor(
    public teachersService: TeachersService,
    public router: Router
  ) { }

  public editTeacher(teacherId: number) {
    this.router.navigateByUrl(`/dashboard/teachers/${teacherId}`);
  }
}