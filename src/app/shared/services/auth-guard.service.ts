import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/account/login');
      return of(false);
    } else if (!this.authService.getUser()) {
      return this.authService.setUser().pipe(map(x => !!x))
    }
    return of(true);
  }
}