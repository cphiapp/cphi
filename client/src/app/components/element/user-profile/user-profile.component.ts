import { Component } from "@angular/core"
import { MatDialog, MatDialogRef } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { UserEditFormDialogComponent } from "../user-edit-form/user-edit-form.component"
import { UserPasswordEditFormDialogComponent } from "../user-password-edit-form/user-password-edit-form.component"


@Component({
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileDialogComponent {

  constructor(private dialogRef: MatDialogRef<UserProfileDialogComponent>,
              private authService: AuthService,
              private dialog: MatDialog) { }

  openUserEditDialog() {
    this.dialog.open(UserEditFormDialogComponent).updateSize("30%")
    .afterClosed().subscribe(newValues => {
      if(newValues != null) {
        this.dialogRef.close()
        this.authService.updateUser(newValues["displayName"], newValues["imageLink"])
      }
    })
  }

  openPasswordEditDialog() {
    this.dialog.open(UserPasswordEditFormDialogComponent).updateSize("30%")
    .afterClosed().subscribe(success => {
      if(success != null) {
        this.dialogRef.close()
        this.authService.logout()
      }
    })
  }

  getCurrentUser() {
    return this.authService.getCurrentUser()
  }

}