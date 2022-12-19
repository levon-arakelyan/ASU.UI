import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ExceptionLevel } from 'src/app/core/enums/exception-level';
import { HttpErrorDetails } from 'src/app/core/services/types/http-error-details';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {

  constructor(
    private readonly notificationsService: ToastrService
  ) { }

  public handleError(error: HttpErrorResponse): void {
    if (error != null) {
      if (error.status == 555) {
        this.handle420ErrorJson(error);
      }
      else if ((typeof error.error === 'string' || error.error instanceof String)) {
        this.notificationsService.error(error.error.toString());
      }
      else {
        console.log("No error handler");
      }
    } else {
      console.log(error);
      this.notificationsService.error("Խնդրում ենք ստուգել համացանցի միացումը");
    }
  }
  
  private handle420ErrorJson(error: HttpErrorResponse): void {
    var errorMessage = error.error as HttpErrorDetails;
    
    switch (errorMessage.exceptionLevel) {
      case ExceptionLevel.Info: {
        this.notificationsService.info(errorMessage.message);
        break;
      }
      case ExceptionLevel.Warning: {
        this.notificationsService.warning(errorMessage.message);
        break;
      }
      case ExceptionLevel.Danger: {
        this.notificationsService.error(errorMessage.message);
        break;
      }
    }
  }
}