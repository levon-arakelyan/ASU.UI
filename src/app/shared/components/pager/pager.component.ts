import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Pager } from './pager';
import { pagingBreakpoints } from 'src/app/core/constants/paging-breakpoints';
import { breakpoints } from 'src/app/core/constants/breakpoints';
import { faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  private _records: number = 0;
  private _page: number = 1;
  private maxPagingButton: number = 10;
  private leftPagingButtonOffset: number = 6;
  private middlePagingButtonOffset: number = 5;
  private screenWidth: number = 0;

  @Input() public set records(value: number) {
    this._records = value;
    this.setPager();
  };
  @Input() public set page(value: number) {
    this._page = value;
    this.setPager();
  };
  @Input() public pageSize: number = 25;
  @Input() public hideIfOnePage: boolean = true;
  @Output() public onChanagePage: EventEmitter<number> = new EventEmitter<number>()

  public pager: Pager = new Pager();

  public faAngleRight = faAngleRight;
  public faAngleDoubleRight = faAngleDoubleRight;
  public faAngleLeft = faAngleLeft;
  public faAngleDoubleLeft = faAngleDoubleLeft;

  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.setPagingButtons();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.screenWidth = (event.target as Window).innerWidth;
    this.setPagingButtons();
  }

  private setPager() {
    this.pager = this.getPager(this._records, this._page, this.pageSize);
  }

  public setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this._records, page, this.pageSize);
    this.onChanagePage.emit(page);
  }

  private getPager(totalItems: number, currentPage: number = 1, pageSize: number = this.pageSize): Pager {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= this.maxPagingButton) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= this.leftPagingButtonOffset) {
        startPage = 1;
        endPage = this.maxPagingButton;
      } else if (currentPage + (this.maxPagingButton - this.leftPagingButtonOffset) >= totalPages) {
        startPage = totalPages - (this.maxPagingButton - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - this.middlePagingButtonOffset + this.maxPagingButton % 2;
        endPage = currentPage + (this.middlePagingButtonOffset - 1);
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  private setPagingButtons(): void {
    let breakpoint = pagingBreakpoints.sm;
    if (this.screenWidth >= breakpoints.sm && this.screenWidth < breakpoints.md) {
      breakpoint = pagingBreakpoints.md;
    } else if (this.screenWidth >= breakpoints.md) {
      breakpoint = pagingBreakpoints.lg;
    }

    this.maxPagingButton = breakpoint.maxPagingButton;
    this.leftPagingButtonOffset = breakpoint.leftPagingButtonOffset;
    this.middlePagingButtonOffset = breakpoint.middlePagingButtonOffset;

    this.setPager();
  }

}
