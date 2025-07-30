import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { UserProfileDialogComponent } from "../user-profile/user-profile.component"


@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"]
})
export class MenubarComponent {

  constructor(private authService: AuthService,
              private dialog: MatDialog) { }

  isLoggedIn() {
    return this.authService.getLoggedIn()
  }

  logout() {
    this.authService.logout()
  }

  openUserProfileDialog() {
    this.dialog.open(UserProfileDialogComponent).updateSize("30%")
  }

  getCurrentUser() {
    return this.authService.getCurrentUser()
  }

}