import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../shared/services/auth.service";
import { InterceptorService } from "../shared/services/interceptor.service";
import { SharedModule } from "../shared/shared.module";
import { AddCourseComponent } from "./add-course/add-course.component";
import { AddDepartmentComponent } from "./add-department/add-department.component";
import { AddFacultyComponent } from "./add-faculty/add-faculty.component";
import { AddProfessionComponent } from "./add-profession/add-profession.component";
import { AddSubjectGroupComponent } from "./add-subject-group/add-subject-group.component";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { AddTeacherComponent } from "./add-teacher/add-teacher.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { DepartmentsListComponent } from "./departments-list/departments-list.component";
import { EditTeacherComponent } from "./edit-teacher/edit-teacher.component";
import { FacultiesListComponent } from "./faculties-list/faculties-list.component";
import { MainNavbarComponent } from "./main-navbar/main-navbar.component";
import { ProfessionsListComponent } from "./professions-list/professions-list.component";
import { CoursesService } from "./services/courses.service";
import { DepartmentsService } from "./services/departments.service";
import { FacultiesService } from "./services/faculties.service";
import { ProfessionsService } from "./services/professions.service";
import { SubjectGroupsService } from "./services/subject-groups.service";
import { SubjectsService } from "./services/subjects.service";
import { TeachersService } from "./services/teachers.service";
import { SubjectGroupsListComponent } from "./subject-groups-list/subject-groups-list.component";
import { SubjectsListComponent } from "./subjects-list/subjects-list.component";
import { TeachersListComponent } from "./teachers-list/teachers-list.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddScheduleComponent } from "./add-schedule/add-schedule.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { AddAudienceComponent } from "./add-audience/add-audience.component";
import { AudienciesListComponent } from "./audiencies-list/audiencies-list.component";
import { AudienciesService } from "./services/audiencies.service";
import { SchedulesService } from "./services/schedules.service";

const routes: Routes = [
  { path: '', component: MainNavbarComponent, children:
    [
      { path: 'faculties', component: FacultiesListComponent },
      { path: 'faculties/add', component: AddFacultyComponent },
      { path: 'departments', component: DepartmentsListComponent },
      { path: 'departments/add', component: AddDepartmentComponent },
      { path: 'professions', component: ProfessionsListComponent },
      { path: 'professions/add', component: AddProfessionComponent },
      { path: 'teachers', component: TeachersListComponent },
      { path: 'teachers/add', component: AddTeacherComponent },
      { path: 'teachers/:id', component: EditTeacherComponent },
      { path: 'courses', component: CoursesListComponent },
      { path: 'courses/add', component: AddCourseComponent },
      { path: 'courses/:id', component: EditCourseComponent },
      { path: 'subjects', component: SubjectsListComponent },
      { path: 'subjects/add', component: AddSubjectComponent },
      { path: 'subject-groups', component: SubjectGroupsListComponent },
      { path: 'subject-groups/add', component: AddSubjectGroupComponent },
      { path: 'audiencies', component: AudienciesListComponent },
      { path: 'audiencies/add', component: AddAudienceComponent },
      { path: '', redirectTo: 'faculties', pathMatch: 'full'},
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    MainNavbarComponent,
    DepartmentsListComponent,
    TeachersListComponent,
    FacultiesListComponent,
    ProfessionsListComponent,
    CoursesListComponent,
    SubjectsListComponent,
    SubjectGroupsListComponent,
    AudienciesListComponent,
    AddTeacherComponent,
    AddFacultyComponent,
    AddDepartmentComponent,
    AddProfessionComponent,
    AddCourseComponent,
    AddSubjectGroupComponent,
    AddSubjectComponent,
    AddScheduleComponent,
    AddAudienceComponent,
    EditTeacherComponent,
    EditCourseComponent,
    ScheduleComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      deps: [AuthService],
      multi: true
    },
    DepartmentsService,
    TeachersService,
    FacultiesService,
    ProfessionsService,
    CoursesService,
    SubjectsService,
    SubjectGroupsService,
    AudienciesService,
    SchedulesService
  ],
})
export class DashboardModule {}