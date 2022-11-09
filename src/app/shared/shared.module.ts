import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputComponent } from "./components/input/input.component";
import { ProvideParentFormDirective } from "./directives/provide-parent-form";
import { AccountsService } from "./services/accounts.service";
import { InterceptorService } from "./services/interceptor.service";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthService } from "./services/auth.service";
import { AdvancedTableColumnComponent } from "./components/advanced-table-column/advanced-table-column.component";
import { AdvancedTableComponent } from "./components/advanced-table/advanced-table.component";
import { PagerComponent } from "./components/pager/pager.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    InputComponent,
    ProvideParentFormDirective,
    AdvancedTableColumnComponent,
    AdvancedTableComponent,
    PagerComponent
  ],
  providers: [
    AccountsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      deps: [AuthService],
      multi: true
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  exports: [
    InputComponent,
    ProvideParentFormDirective,
    AdvancedTableColumnComponent,
    AdvancedTableComponent,
    PagerComponent
  ]
})
export class SharedModule {}