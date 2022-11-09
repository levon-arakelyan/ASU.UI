import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginModel } from "src/app/core/models/login-model";
import { Observable } from "rxjs";
import { IAccountsService } from "src/app/core/services/iaccounts.service";
import { AuthenticatedUser } from "src/app/core/models/authenticated-user-model";
import { Token } from "src/app/core/models/token-model";
import { AppSettingsService } from "./app-settings.service";
import { ApiBaseService } from "src/app/core/services/api-base-service";

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends ApiBaseService implements IAccountsService {
  constructor(private http: HttpClient, private settings: AppSettingsService) {
    super();
    this.settings.onConfigLoaded.subscribe(() => {
      this.endpoint = `${this.settings.serverUrl}accounts/`;
    })
  }

  public login(loginModel: LoginModel): Observable<Token> {
    return this.http.post<Token>(`${this.endpoint}login`, loginModel)
  }

  public get(): Observable<AuthenticatedUser> {
    return this.http.get<AuthenticatedUser>(this.endpoint);
  }
}