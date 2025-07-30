import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { ModifyUserRequest } from "../../../entities/request/modify-user-request"
import { UserService } from "../../../services/http/user.service"


@Component({
  templateUrl: "./user-edit-form.component.html"
})
export class UserEditFormDialogComponent {

  private errorMessage: string
  private userEditForm: FormGroup

  constructor(private dialog: MatDialogRef<UserEditFormDialogComponent>,
              private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.userEditForm = this.formBuilder.nonNullable.group ({
      displayName: [this.authService.getCurrentUser().getDisplayName(), Validators.required],
    })
  }

  getUserEditForm() {
    return this.userEditForm
  }

  getErrorMessage() {
    return this.errorMessage
  }

  onUserEditFormSubmit() {
    this.errorMessage = ""
    if(!this.userEditForm.valid) {
      return
    }

    this.userService.modifyUser(new ModifyUserRequest(this.userEditForm.value)).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<Object>) {
    this.dialog.close(this.userEditForm.value)
  }

  private handleFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case HttpStatusCode.BadRequest:
        this.errorMessage = err.error
        break
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

}