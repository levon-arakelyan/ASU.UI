import { Component, OnInit } from "@angular/core";
import { UserRole } from "src/app/core/enums/user-role";
import { AuthenticatedUser } from "src/app/core/models/authenticated-user-model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit{
  public user: AuthenticatedUser;
  public Role = UserRole;
  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  public logout() {
    this.authService.logout();
  }

}