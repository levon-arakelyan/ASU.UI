import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { SubjectDto } from "src/app/core/dto/subject-dto";
import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { TeacherDegree } from "src/app/core/enums/teacher-degree";
import { EditTeacherModel } from "src/app/core/models/edit-teacher-model";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { TeacherShortInfoModel } from "src/app/core/models/teacher-short-info-model";
import { DepartmentsService } from "../services/departments.service";
import { EnumHelper } from "../services/helpers/enum-helper";
import { PatchHelper } from "../services/helpers/patch-helper";
import { SubjectsService } from "../services/subjects.service";
import { TeachersService } from "../services/teachers.service";

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  private teacherId: number;

  public initialTeacher: TeacherShortInfoModel;
  public updatedTeacher: TeacherShortInfoModel;

  public editTeacherModel: EditTeacherModel;

  public departmentsList: DepartmentDto[] = [];
  public subjectsList: SubjectDto[] = [];
  public degreesList: SelectItemModel[] = EnumHelper.parseToSelectItems(TeacherDegree);

  public loading: boolean = false;
  public editLoading: boolean = false;

  public faArrowLeft = faArrowLeft;
  public faSpinner = faSpinner;

  constructor(
    private readonly teachersService: TeachersService,
    private readonly departmentsService: DepartmentsService,
    private readonly subjectsService: SubjectsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.router.navigateByUrl('/dashboard/teachers');
        return;
      }
      this.teacherId = Number(params.id);
      this.getTeacher();
    });
    this.departmentsService.getAll().subscribe(res => {
      this.departmentsList = res;
    });
    this.subjectsService.getAll().subscribe(res => {
      this.subjectsList = res;
    })
  }

  private getTeacher(): void {
    this.loading = true;
    this.teachersService.get(this.teacherId).subscribe({
      next: res => {
        this.initialTeacher = new TeacherShortInfoModel(res);
        this.updatedTeacher = new TeacherShortInfoModel(res);
        this.editTeacherModel = new EditTeacherModel(res);
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
    this.editTeacherModel.teacherShortInfoPatch = PatchHelper.createPatch(this.initialTeacher, this.updatedTeacher);
    this.teachersService.edit(this.teacherId, this.editTeacherModel).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard/teachers');
        this.editLoading = false; 
      },
      error: err => {
        this.editLoading = false; 
      }
    })
  }
}