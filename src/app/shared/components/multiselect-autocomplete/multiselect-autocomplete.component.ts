import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from "@angular/core";
import { NgForm, ValidationErrors } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from "rxjs";
import { SelectItemModel } from "src/app/core/models/select-item-model";

@Component({
  selector: 'app-multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.css']
})
export class MultiselectAutocompleteComponent implements OnChanges {
  @ViewChild('autocomplete', { static: true }) autocomplete: NgbTypeahead;
  @Input() label: string;
  @Input() required: boolean = true;
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() showSelectedItems: boolean = true;
  @Input() items: SelectItemModel[] = [];
  @Input() selectedItemsIds: number[] = [];
  @Output() selectedItemsIdsChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  public focus$ = new Subject<string>();
	public click$ = new Subject<string>();
  public filterText: string = '';
  public maxItemsCountToShow: number = 3;

  public get selectedItemsNames(): string[] {
    return this.selectedItemsIds.map(x => this.items.find(item => x == item.id)?.name);
  }

  constructor(public form: NgForm) {  }

  public search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.autocomplete.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) => {
        if (term === '') {
          return this.items.map(x => x.name)
        }
        return this.items.map(x => x.name).filter(x => x.toLowerCase().includes(term.toLowerCase()));
      }),
		);
	};

  public ngOnChanges(): void {
    if (this.required && Object.keys(this.form.controls).length) {
      const control = this.form.controls[this.name];
      control.addValidators([this.requiredValidator]);
      control.setErrors({ required: true });
    }
  }

  public onItemClicked(name: string): void {
    
    const id = this.items.find(x => x.name == name).id;
    const index = this.selectedItemsIds.findIndex(x => x == id);
    if (index >= 0) {
      this.selectedItemsIds.splice(index, 1);
    } else {
      this.selectedItemsIds.push(id);
    }
    this.selectedItemsIdsChange.emit(this.selectedItemsIds);
    setTimeout(() => this.filterText = '');
  }

  private requiredValidator = (): ValidationErrors | null => {
    return this.selectedItemsIds.length ? null : { required: true };
  }
}