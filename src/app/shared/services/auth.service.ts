import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { AuthenticatedUser } from 'src/app/core/models/authenticated-user-model';
import { LoginModel } from 'src/app/core/models/login-model';
import { AccountsService } from './accounts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthService } from 'src/app/core/services/interfaces/iauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private user: AuthenticatedUser;
  private readonly storageTokenKey: string = 'auth-token';
  
  constructor(private accountsService: AccountsService, private jwtService: JwtHelperService) {
  }

  public login(loginModel: LoginModel): Observable<AuthenticatedUser> {
    return this.accountsService.login(loginModel)
      .pipe(
        tap(res => {
          this.saveTokenInStorage(res.token);
        }),
        switchMap(() => this.setUser()),
      );
  }

  public logout(): void {
    this.removeAuth();
    location.reload();
  }

  public getTokenFromStorage(): string {
    return localStorage.getItem(this.storageTokenKey) || '';
  }

  public getUser(): AuthenticatedUser {
    return this.user;
  }

  public isAuthenticated(): boolean {
    const token = this.getTokenFromStorage();
    return token && !this.jwtService.isTokenExpired(token);
  }

  private removeTokenStorage(): void {
    localStorage.removeItem(this.storageTokenKey);
  }

  private removeAuth(): void {
    this.user = null;
    this.removeTokenStorage();
  }

  public setUser(): Observable<AuthenticatedUser> {
    if (this.getTokenFromStorage()) {
      return this.accountsService.get()
        .pipe(
          tap((user: AuthenticatedUser) => {
            this.user = user;
          }),
          catchError(_ => {
            this.removeAuth();
            return throwError(() => false);
          }),
        );
    } else {
      this.removeAuth();
      return throwError(() => false);
    }
  }

  private saveTokenInStorage(token: string): void {
    localStorage.setItem(this.storageTokenKey, token);
  }
}
