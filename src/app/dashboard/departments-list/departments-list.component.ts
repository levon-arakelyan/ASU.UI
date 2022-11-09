import { Location, LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentDto } from "src/app/core/dto/department-dto";
import { IAdvancedListQueryParams } from "src/app/core/interfaces/iadvanced-table-query-params";
import { PagedItemsList, PagedListOrder } from "src/app/core/models/paged-list-model";
import { AppSettingsService } from "src/app/shared/services/app-settings.service";
import { DepartmentsService } from "../services/departments.service";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsList implements OnInit {
  public filter: string = '';
  public pagedDepartments = new PagedItemsList<DepartmentDto>(
    this.settings.pagedList.defaultPage,
    this.settings.pagedList.defaultPageSize,
    new PagedListOrder(this.settings.pagedList.defaultOrderBy, this.settings.pagedList.defaultOrderDirection)
  );

  constructor(
    private departmentsService: DepartmentsService,
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
      data.hasOwnProperty('page') && data.page !== null && (this.pagedDepartments.page = Number(data.page));
      data.hasOwnProperty('orderBy') && data.orderBy !== null && (this.pagedDepartments.order.orderBy = data.orderBy);
      data.hasOwnProperty('direction') && data.direction !== null && (this.pagedDepartments.order.direction = data.direction);
    }
    this.loadData();
  }

  private loadData(): void {
    this.setPageState();

    this.departmentsService.getPaged(
      this.filter,
      this.pagedDepartments.page,
      this.pagedDepartments.pageSize,
      this.pagedDepartments.order
    ).subscribe(x => {
      this.pagedDepartments = x
    });
  }

  private setPageState() {
    let queryParams: IAdvancedListQueryParams = {
      page: this.pagedDepartments.page,
      orderBy: this.pagedDepartments.order.orderBy,
      direction: this.pagedDepartments.order.direction,
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