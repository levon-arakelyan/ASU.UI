import { Observable } from "rxjs";
import { LoginModel } from "../models/login-model";
import { Token } from "../models/token-model";

export interface IAccountsService {
  login(loginModel: LoginModel): Observable<Token>;
}