import { ExceptionLevel } from "../../enums/exception-level";

export class HttpErrorDetails {
  public message: string;
  public exceptionLevel: ExceptionLevel;
  public httpStatusCode: number;
}