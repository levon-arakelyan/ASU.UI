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
import { RouterModule } from "@angular/router";
import { SelectComponent } from "./components/select/select.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { MinValueValidatorDirective } from "./directives/min-value";
import { PageLoadingComponent } from "./components/page-loading/page-loading.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MultiselectComponent } from "./components/multiselect/multiselect.component";
import { MultiselectAutocompleteComponent } from "./components/multiselect-autocomplete/multiselect-autocomplete.component";
import { AutocompleteComponent } from "./components/autocomplete/autocomplete.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ProvideParentFormDirective,
    MinValueValidatorDirective,
    AdvancedTableColumnComponent,
    AdvancedTableComponent,
    PagerComponent,
    PageLoadingComponent,
    AutocompleteComponent,
    MultiselectComponent,
    MultiselectAutocompleteComponent
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
    SelectComponent,
    CheckboxComponent,
    ProvideParentFormDirective,
    MinValueValidatorDirective,
    AdvancedTableColumnComponent,
    AdvancedTableComponent,
    PagerComponent,
    PageLoadingComponent,
    AutocompleteComponent,
    MultiselectComponent,
    MultiselectAutocompleteComponent
  ]
})
export class SharedModule {}