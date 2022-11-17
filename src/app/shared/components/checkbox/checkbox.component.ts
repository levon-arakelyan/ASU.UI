import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input() label: string;
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
}