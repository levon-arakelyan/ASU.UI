import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IConfirmationModalService } from "src/app/core/services/interfaces/iconfirmation-modal.service";
import { ConfirmationModalOptions } from "src/app/core/services/types/confirmation-modal-options";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService implements IConfirmationModalService {
  constructor(
    private readonly modalService: NgbModal
  ) {}

  open(options: ConfirmationModalOptions) {
    const appliableOptions = new ConfirmationModalOptions();
    for (let key in options) {
      const appliableKey = key as keyof ConfirmationModalOptions;
      appliableOptions[appliableKey] = options[appliableKey];
    }
    const modalRef = this.modalService.open(appliableOptions.component, appliableOptions.ngbOptions);
    modalRef.componentInstance.options = appliableOptions;
    modalRef.dismissed.subscribe(options.denied);
    modalRef.closed.subscribe(options.agreed)
  }
}