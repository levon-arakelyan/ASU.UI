import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.html']
})
export class InputComponent {
  @Input() label: string;
  @Input() required: boolean = true;
  @Input() name: string;
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() value: any = '';
  @Input() disabled: boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public form: NgForm) { }
}