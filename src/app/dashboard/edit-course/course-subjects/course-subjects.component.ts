import { Component, Input, OnInit } from "@angular/core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { Operation } from "rfc6902";
import { CourseSubjectDto } from "src/app/core/dto/course-subject-dto";
import { CourseSubjectsService } from "../../services/course-subjects.service";
import { PatchHelper } from "../../services/helpers/patch-helper";

@Component({
  selector: 'app-course-subjects',
  templateUrl: './course-subjects.component.html',
  styleUrls: ['./course-subjects.component.css']
})
export class CourseSubjectsComponent implements OnInit {
  @Input() courseId: number;
  public initialCourseSubjects: CourseSubjectDto[] = [];
  public updatedCourseSubjects: CourseSubjectDto[] = [];
  public getLoading: boolean = false;
  public isCourseSubjectsSaving: boolean = false;
  
  private courseSubjectsSaved = "Կրեդիտները հաջողությամբ պահպանվել են";
  
  public faSpinner = faSpinner;

  constructor(
    private readonly courseSubjectsService: CourseSubjectsService,
    private readonly notificationsService: ToastrService
  ) { }
  
  public ngOnInit(): void {
    this.getCourseSubjects();
  }

  public saveCourseSubjects(): void {
    this.updatedCourseSubjects = this.updatedCourseSubjects.map(x => ({...x, credit: parseInt(x.credit.toString())}));

    const patch = PatchHelper.createPatch(this.initialCourseSubjects, this.updatedCourseSubjects);
    if (!patch) {
      return;
    }

    this.isCourseSubjectsSaving = true;
    this.courseSubjectsService.save(this.updatedCourseSubjects.map(x => x.id), patch).subscribe({
      next: () => {
        this.notificationsService.success(this.courseSubjectsSaved);
        this.isCourseSubjectsSaving = false;
      },
      error: () => {
        this.isCourseSubjectsSaving = false;
      }
    });
  }

  private getCourseSubjects(): void {
    this.getLoading = true;
    this.courseSubjectsService.getForCourse(this.courseId).subscribe({
      next: res => {
        this.initialCourseSubjects = res;
        console.log(this.initialCourseSubjects)
        this.updatedCourseSubjects = res;
        this.getLoading = false;
      },
      error: () => {
        this.getLoading = false;
      }
    })
  }
}