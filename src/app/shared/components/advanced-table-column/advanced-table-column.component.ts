import { Component, OnInit, TemplateRef, Input, ContentChild } from '@angular/core';

@Component({
  selector: 'app-advanced-table-column',
  template: ''
})
export class AdvancedTableColumnComponent implements OnInit {
  @ContentChild('incomingTemplate') incomingTemplate: TemplateRef<HTMLElement> = null;
  @Input('key') public key: string = "";
  @Input('title') public title: string = "";
  @Input('sort') public sort: boolean = false;
  @Input('filter') public filter: boolean = false;
  @Input('class') public class: string = "";

  constructor() { }

  ngOnInit() {
  }

}
