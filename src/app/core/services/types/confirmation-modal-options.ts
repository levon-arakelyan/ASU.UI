import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";

export class ConfirmationModalOptions {
  public component?: any;
  public ngbOptions?: NgbModalOptions;
  public action?: string;
  public denyButtonText?: string;
  public agreeButtonText?: string;

  public agreed?: (message: any) => void;
  public denied?: (message: any) => void;

  constructor() {
    this.component = ConfirmationModalComponent;
    this.action = 'կատարել այդ գործողությունը';
    this.ngbOptions = { centered: true };
    this.denyButtonText = 'Ոչ';
    this.agreeButtonText = 'Այո';
  }
}