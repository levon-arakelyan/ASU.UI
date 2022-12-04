import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CourseDto } from "src/app/core/dto/course-dto";
import { ProfessionDto } from "src/app/core/dto/profession-dto";
import { CourseDegree } from "src/app/core/enums/course-degree";
import { EducationType } from "src/app/core/enums/education-type";
import { CourseShortInfoModel } from "src/app/core/models/course-short-info-model";
import { EditCourseModel } from "src/app/core/models/edit-course-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { CoursesService } from "../services/courses.service";
import { EnumHelper } from "../services/helpers/enum-helper";
import { PatchHelper } from "../services/helpers/patch-helper";
import { ProfessionsService } from "../services/professions.service";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  public courseId: number;
  public courseDto: CourseDto;
  public initialCourse: CourseShortInfoModel;
  public updatedCourse: CourseShortInfoModel;
  public editCourseModel: EditCourseModel;

  public professionsList: ProfessionDto[] = [];
  public degreesList: SelectItemModel[] = EnumHelper.parseToSelectItems(CourseDegree);
  public educationTypesList: SelectItemModel[] = EnumHelper.parseToSelectItems(EducationType);

  public loading: boolean = false;
  public editLoading: boolean = false;

  public faArrowLeft = faArrowLeft;

  constructor(
    private readonly professionsService: ProfessionsService,
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('/dashboard/courses');
        return;
      }
      this.courseId = Number(params.id);
      this.getCourse();
    });
    this.professionsService.getAll().subscribe(res => {
      this.professionsList = res;
    });
  }

  private getCourse(): void {
    this.loading = true;
    this.coursesService.get(this.courseId).subscribe({
      next: res => {
        this.courseDto = res;
        this.initialCourse = new CourseShortInfoModel(res);
        this.updatedCourse = new CourseShortInfoModel(res);
        this.editCourseModel = new EditCourseModel(res);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }

    this.editLoading = true;
    this.editCourseModel.courseShortInfoPatch = PatchHelper.createPatch(this.initialCourse, this.updatedCourse);
    this.coursesService.add(this.updatedCourse).subscribe(() => {
      this.router.navigateByUrl('/dashboard/courses');
    })
  }
}