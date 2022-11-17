import { Component, Input } from "@angular/core";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.css']
})
export class PageLoadingComponent {
  @Input() active: boolean = false;
  public faSpinner = faSpinner; 
}