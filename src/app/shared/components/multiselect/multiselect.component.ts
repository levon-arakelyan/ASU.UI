import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { AbstractControl, NgForm, NgModel, ValidationErrors } from "@angular/forms";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { SelectItemModel } from "src/app/core/models/select-item-model";

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnChanges {
  // @ViewChild(NgModel) model: NgModel;
  @Input() label: string;
  @Input() required: boolean = true;
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() items: SelectItemModel[] = [];
  @Input() selectedItemsIds: number[] = [];

  public get _selectedItemsIds(): string {
    return this.selectedItemsIds.join();
  }
  public set _selectedItemsIds(_: any) {

  }

  @Output() selectedItemsIdsChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  public faAngleDown = faAngleDown;

  public maxItemsCountToShow: number = 3;
  public touched: boolean = false;

  public get selectedItemsNames(): string[] {
    return this.selectedItemsIds.map(x => this.items.find(item => x == item.id).name);
  }

  constructor(public form: NgForm) { }

  public ngOnChanges(): void {
    if (this.required && Object.keys(this.form.controls).length) {
      const control = this.form.controls[this.name];
      control.addValidators([this.requiredValidator]);
      control.setErrors({ required: true })
    }
  }

  public onItemClicked(id: number): void {
    const index = this.selectedItemsIds.findIndex(x => x == id);
    if (index >= 0) {
      this.selectedItemsIds.splice(index, 1);
    } else {
      this.selectedItemsIds.push(id);
    }
    this.selectedItemsIdsChange.emit(this.selectedItemsIds);
  }

  private requiredValidator(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.length ? null : { required: true };
  }
}