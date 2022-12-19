import { Observable } from "rxjs";
import { AuthenticatedUser } from "../../models/authenticated-user-model";
import { LoginModel } from "../../models/login-model";

export interface IAuthService {
  login(loginModel: LoginModel): Observable<AuthenticatedUser>;
  logout(): void;
  getTokenFromStorage(): string;
  getUser(): AuthenticatedUser;
  setUser(): Observable<AuthenticatedUser>;
  isAuthenticated(): boolean;
}