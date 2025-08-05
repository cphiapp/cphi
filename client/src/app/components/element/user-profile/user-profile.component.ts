import { Component } from "@angular/core"

import { AuthService } from "../../../services/auth/auth.service"


@Component({
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileDialogComponent {

  constructor(private authService: AuthService) { }

  getCurrentUser() {
    return this.authService.getCurrentUser()
  }

}