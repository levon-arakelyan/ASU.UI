import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/core/models/login-model";
import { AuthService } from "src/app/shared/services/auth.service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('form') form: NgForm;

  public loginModel: LoginModel = new LoginModel();
  public loading: boolean = false;

  public faSpinner = faSpinner;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public submit(): void {
    this.loading = true;
    this.authService.login(this.loginModel).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard/main-page');
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}