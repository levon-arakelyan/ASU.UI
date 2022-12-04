import { Location, LocationStrategy } from '@angular/common';
import { Component, OnInit, Input, TemplateRef, ContentChildren, ContentChild, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDirection } from 'src/app/core/enums/order-direction';
import { IAdvancedListQueryParams } from 'src/app/core/interfaces/iadvanced-table-query-params';
import { PagedItemsList, PagedListOrder } from 'src/app/core/models/paged-list-model';
import { AppSettingsService } from '../../services/app-settings.service';
import { AdvancedTableColumnComponent } from '../advanced-table-column/advanced-table-column.component';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.css']
})
export class AdvancedTableComponent implements OnInit {
  @ContentChildren(AdvancedTableColumnComponent) columns: QueryList<AdvancedTableColumnComponent>;
  @ContentChild("contentOutsideFromFilterZone") contentOutsideFromFilterZone: TemplateRef<HTMLElement> = null;
  @ContentChild("contentInFilterZone") contentInFilterZone: TemplateRef<HTMLElement> = null;

  @Input() public hasSearchBar: boolean = true;
  @Input() public hasClearButton: boolean = true;
  @Input() public hasPagination: boolean = true;
  @Input() public clearLabel: string = "Ջնջել";
  @Input() public placeholder: string = "Փնտրել";
  @Input() public description: string = "";
  @Input() public shouldFiltersBeCollapsed: boolean = false;
  @Input() public listName: string = '';
  @Input() public serviceWithGetPaged: { getPaged: (filter: string, page: number, pageSize: number, order: PagedListOrder) => Observable<PagedItemsList<any>> }

  public filterText: string = "";
  public isFilterCollapsed: boolean = true;

  public page: number = this.settings.pagedList.defaultPage;
  public pageSize: number = this.settings.pagedList.defaultPageSize;
  public order: PagedListOrder = new PagedListOrder(
    this.settings.pagedList.defaultOrderBy,
    this.settings.pagedList.defaultOrderDirection
  );
  public items: any[] = [];
  public totalRecords: number = 0

  public loading: boolean = false;

  public faPlus = faPlus;
  public faArrowRight = faArrowRight;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly locationStrategy: LocationStrategy,
    private readonly router: Router,
    private readonly settings: AppSettingsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.getQueryParams(params as IAdvancedListQueryParams);
    });
  }

  public getQueryParams(data : IAdvancedListQueryParams) {
    if (data) {
      data.hasOwnProperty('filter') && data.filter !== null && (this.filterText = data.filter);
      data.hasOwnProperty('page') && data.page !== null && (this.page = Number(data.page));
      data.hasOwnProperty('orderBy') && data.orderBy !== null && (this.order.orderBy = data.orderBy);
      data.hasOwnProperty('direction') && data.direction !== null && (this.order.direction = data.direction);
    }
    this.loadData();
  }

  private loadData() {
    this.setPageState();
    this.loading = true;
    this.serviceWithGetPaged.getPaged(
      this.filterText,
      this.page,
      this.pageSize,
      this.order
    ).subscribe({
      next: pagedList => {
        this.items = pagedList.data;
        this.page = pagedList.page;
        this.totalRecords = pagedList.totalRecords;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  public doSearch(): void {
    this.page = 1;
    this.loadData();
  }

  public setPage(page: number): void {
    this.page = page;
    this.loadData();
  }

  public getOrderClass(column: string): string {
    if (this.order.orderBy === column) {
      return this.order.direction == OrderDirection.Ascending ? "caret-down-fill" : "caret-up-fill";
    };
    return "";
  }

  public setOrderBy(column: string): void {
    if (this.order.orderBy === column) {
      this.order.direction = (this.order.direction == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending);
    } else {
      this.order.direction = OrderDirection.Descending;
    }
    this.order.orderBy = column;

    this.loadData();
  }

  private setPageState() {
    let queryParams: IAdvancedListQueryParams = {
      page: this.page,
      orderBy: this.order.orderBy,
      direction: this.order.direction,
      filter: this.filterText
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