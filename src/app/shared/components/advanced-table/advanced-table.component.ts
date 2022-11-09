import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ContentChildren, ContentChild, QueryList, ElementRef } from '@angular/core';
import { OrderDirection } from 'src/app/core/enums/order-direction';
import { IAdvancedListQueryParams } from 'src/app/core/interfaces/iadvanced-table-query-params';
import { PagedListOrder } from 'src/app/core/models/paged-list-model';
import { AdvancedTableColumnComponent } from '../advanced-table-column/advanced-table-column.component';

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.css']
})
export class AdvancedTableComponent implements OnInit {
  @ContentChildren(AdvancedTableColumnComponent) columns: QueryList<AdvancedTableColumnComponent>;
  @ContentChild("contentOutsideFromFilterZone") contentOutsideFromFilterZone: TemplateRef<HTMLElement> = null;
  @ContentChild("contentInFilterZone") contentInFilterZone: TemplateRef<HTMLElement> = null;
  @Input() public items: any[] = null;
  @Input() public shouldHighlightFilterText: boolean = true;
  @Input() public filterText: string = "";
  @Input() public order: PagedListOrder = { orderBy: null, direction: OrderDirection.Ascending };
  @Input() public currentPage: number = 1;
  @Input() public totalRecords: number = 0;
  @Input() public pageSize: number = 25;
  @Input() public hasSearchBar: boolean = true;
  @Input() public hasClearButton: boolean = true;
  @Input() public hasPagination: boolean = true;
  @Input() public clearLabel: string = "Ջնջել";
  @Input() public placeholder: string = "Փնտրել";
  @Input() public initialOrderBy: PagedListOrder;
  @Input() public description: string = "";
  @Input() public shouldFiltersBeCollapsed: boolean = false;
  @Input() public listName: string = '';

  @Output() public reloadData: EventEmitter<any> = new EventEmitter<any>();
  public isFilterCollapsed: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.initialOrderBy = Object.assign({}, this.order);
  }

  public doSearch(): void {
    this.currentPage = 1;
    this.reload();
  }

  public clearFilters(): void {
    this.currentPage = 1;
    this.filterText = "";
    this.order.orderBy = this.initialOrderBy.orderBy;
    this.order.direction = this.initialOrderBy.direction;
    this.reload();
  }

  public setPage(page: number): void {
    this.currentPage = page;
    this.reload();
  }

  private reload() {
    let queryParams: IAdvancedListQueryParams = {
      page: this.currentPage,
      orderBy: this.order.orderBy,
      direction: this.order.direction,
      filter: this.filterText
    };
    this.reloadData.emit(queryParams);
  }

  public getOrderBy(): string {
    return (this.order.direction === OrderDirection.Ascending ? '' : '-') + this.order.orderBy;
  }

  public getOrderClass(column: string): string {
    if (this.order.orderBy === column) {
      return this.order.direction === OrderDirection.Ascending ? "caret-down-fill" : "caret-up-fill";
    };
    return "";
  }

  public setOrderBy(column: string): void {
    if (this.order.orderBy === column) {
      this.order.direction = this.order.direction === OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
    } else {
      this.order.orderBy = column;
      this.order.direction = OrderDirection.Ascending;
    }
    this.reload();
  }
}