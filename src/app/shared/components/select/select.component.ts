import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() label: string;
  @Input() inline: boolean = false;
  @Input() name: string;
  @Input() value: any;
  @Input() items: { id: number, name: string }[] = [];
  @Output() valueChange = new EventEmitter<any>();
} 