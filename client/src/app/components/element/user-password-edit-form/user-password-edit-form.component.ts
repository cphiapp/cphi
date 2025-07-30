import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { ModifyPasswordRequest } from "../../../entities/request/modify-password-request"
import { UserService } from "../../../services/http/user.service"


@Component({
  templateUrl: "./user-password-edit-form.component.html"
})
export class UserPasswordEditFormDialogComponent {

  private errorMessage: string
  private passwordInputTypes: Map<string, string>
  private passwordEditForm: FormGroup


  constructor(private dialog: MatDialogRef<UserPasswordEditFormDialogComponent>,
              private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.passwordInputTypes = new Map<string, string>()
    this.passwordInputTypes.set("oldPassword", "password")
    this.passwordInputTypes.set("newPassword", "password")
    this.passwordInputTypes.set("newPasswordConfirm", "password")
    this.passwordEditForm = this.formBuilder.nonNullable.group ({
      oldPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  getPasswordEditForm() {
    return this.passwordEditForm
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getPasswordInputType(input: string) {
    return this.passwordInputTypes.get(input)
  }

  showPassword(input: string) {
    this.passwordInputTypes.set(input, "text")
  }

  hidePassword(input: string) {
    this.passwordInputTypes.set(input, "password")
  }

  onPasswordEditFormSubmit() {
    this.errorMessage = ""
    this.passwordEditForm.controls["newPassword"].updateValueAndValidity()
    this.passwordEditForm.controls["newPasswordConfirm"].updateValueAndValidity()
    if(!this.passwordEditForm.valid) {
      return
    }
    if(this.passwordEditForm.controls["newPassword"].value != this.passwordEditForm.controls["newPasswordConfirm"].value) {
      this.errorMessage = "Passwords do not match"
      this.passwordEditForm.controls["newPassword"].setErrors({"incorrect": true})
      this.passwordEditForm.controls["newPasswordConfirm"].setErrors({"incorrect": true})
      return
    }

    this.userService.modifyPassword(new ModifyPasswordRequest(this.passwordEditForm.value)).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<Object>) {
    this.dialog.close("true")
    this.authService.logout()
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