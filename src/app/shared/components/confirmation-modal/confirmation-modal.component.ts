import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalOptions } from "src/app/core/services/types/confirmation-modal-options";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() options: ConfirmationModalOptions;

	constructor(public activeModal: NgbActiveModal) {}
}