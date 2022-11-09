import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/core/models/login-model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  public loginModel: LoginModel = new LoginModel();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public submit(): void {
    this.authService.login(this.loginModel).subscribe(() => {
      this.router.navigateByUrl('/dashboard/main-page')
    });
  }
}