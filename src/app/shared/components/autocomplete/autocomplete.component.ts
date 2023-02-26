import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { SelectItemModel } from "src/app/core/models/select-item-model";
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, of } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
	@ViewChild('autocomplete', { static: true }) autocomplete: NgbTypeahead;
  @Input() showOnClick: boolean = true;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() items: SelectItemModel[] = [];
  @Input() margin: boolean = true;
  @Input() selectedItemId: number = null;
  @Output() selectedItemIdChange: EventEmitter<number> = new EventEmitter<number>();
  
  @HostListener('click', ['$event'])
  onClick(e: PointerEvent) {
    const elem = e.target as HTMLElement;
    if (
      elem.tagName == 'NGB-HIGHLIGHT' ||
      elem.classList.contains('dropdown-item') ||
      elem.classList.contains('ngb-highlight')
    ) {
      this.onItemClicked();
    }
  }

	public focus$ = new Subject<string>();
	public click$ = new Subject<string>();
  public filterText: string = '';

  constructor(public form: NgForm) {  }

  public ngOnInit(): void {
    this.setFilterText();
  }
  
  public search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.autocomplete.isPopupOpen()));
		const inputFocus$ = this.focus$;
		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) => {
        if (term === '') {
          return this.items.map(x => x.name).splice(0, 10)
        }
        return this.items.map(x => x.name).filter(x => x.toLowerCase().includes(term.toLowerCase())).splice(0, 10);
      }),
		);
	};

  public onItemClicked() {
    const id = this.items.find(x => x.name == this.filterText)?.id;
    this.selectedItemId = id;
    this.selectedItemIdChange.emit(id);
  }

  private setFilterText(): void {    
    this.filterText = this.items.find(x => x.id == this.selectedItemId)?.name;
  }
}