import { HttpErrorResponse } from "@angular/common/http";

export interface IHttpErrorHandlerService {
  handleError(error: HttpErrorResponse): void;
}