import { ConfirmationModalOptions } from "../types/confirmation-modal-options";

export interface IConfirmationModalService {
  open(options: ConfirmationModalOptions): void;
}