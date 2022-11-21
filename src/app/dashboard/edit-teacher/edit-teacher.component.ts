import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { TeachersService } from "../services/teachers.service";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  private teacherId: number;
  public teacher: TeacherDto = new TeacherDto();
  public loading: boolean = false;

  constructor(
    private readonly teachersService: TeachersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('/dashboard/teachers');
      }
      this.teacherId = Number(params.id);
      this.getTeacher();
    });
  }

  private getTeacher(): void {
    this.loading = true;
    this.teachersService.get(this.teacherId).subscribe({
      next: res => {
        this.teacher = res;
        this.loading = false;
        console.log(res)
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}