import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../shared/services/auth.service";
import { InterceptorService } from "../shared/services/interceptor.service";
import { SharedModule } from "../shared/shared.module";
import { DepartmentsList } from "./departments-list/departments-list.component";
import { MainNavbarComponent } from "./main-navbar/main-navbar.component";
import { DepartmentsService } from "./services/departments.service";
import { TeachersService } from "./services/teachers.service";
import { TeachersListComponent } from "./teachers-list/teachers-list.component";

const routes: Routes = [
  { path: '', component: MainNavbarComponent, children:
    [
      { path: 'departments', component: DepartmentsList },
      { path: 'teachers', component: TeachersListComponent },
      { path: '', redirectTo: 'departments', pathMatch: 'full'},
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    MainNavbarComponent,
    DepartmentsList,
    TeachersListComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      deps: [AuthService],
      multi: true
    },
    DepartmentsService,
    TeachersService
  ],
})
export class DashboardModule {}