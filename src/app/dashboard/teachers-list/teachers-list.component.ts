import { TeacherDto } from "src/app/core/dto/teacher-dto";
import { Location, LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAdvancedListQueryParams } from "src/app/core/interfaces/iadvanced-table-query-params";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { DepartmentsService } from "../services/departments.service";
import { TeachersService } from "../services/teachers.service";

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {
  public filter: string = '';
  public pagedTeachers = new PagedItemsList<TeacherDto>(
    this.settings.pagedList.defaultPage,
    this.settings.pagedList.defaultPageSize,
    new PagedListOrder(this.settings.pagedList.defaultOrderBy, this.settings.pagedList.defaultOrderDirection)
  );

  constructor(
    private teachersService: TeachersService,
    private settings: AppSettingsService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly locationStrategy: LocationStrategy,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        this.reloadWithData(params as IAdvancedListQueryParams);
    });
  }
  
  public reloadWithData(data : IAdvancedListQueryParams) {
    if (data) {
      data.hasOwnProperty('filter') && data.filter !== null && (this.filter = data.filter);
      data.hasOwnProperty('page') && data.page !== null && (this.pagedTeachers.page = Number(data.page));
      data.hasOwnProperty('orderBy') && data.orderBy !== null && (this.pagedTeachers.order.orderBy = data.orderBy);
      data.hasOwnProperty('direction') && data.direction !== null && (this.pagedTeachers.order.direction = data.direction);
    }
    this.loadData();
  }

  private loadData(): void {
    this.setPageState();

    this.teachersService.getPaged(
      this.filter,
      this.pagedTeachers.page,
      this.pagedTeachers.pageSize,
      this.pagedTeachers.order
    ).subscribe(x => {
      this.pagedTeachers = x
    });
  }

  private setPageState() {
    let queryParams: IAdvancedListQueryParams = {
      page: this.pagedTeachers.page,
      orderBy: this.pagedTeachers.order.orderBy,
      direction: this.pagedTeachers.order.direction,
      filter: this.filter
    };

    this.location.replaceState(
      this.router.createUrlTree(
        [this.locationStrategy.path().split('?')[0]],
        {
          queryParams
        }
      ).toString()
    );
  }
}