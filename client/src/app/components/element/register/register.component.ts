import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { AuthTokenService } from "../../../services/auth/auth-token.service"
import { CreateUserRequest } from "../../../entities/request/create-user-request"
import { User } from "../../../entities/response/user-response"
import { UserService } from "../../../services/http/user.service"


@Component({
  templateUrl: "./register.component.html"
})
export class RegisterDialogComponent {

  private errorMessage: string
  private passwordInputTypes: Map<string, string>
  private registerForm: FormGroup

  constructor(private authService: AuthService,
              private authTokenService: AuthTokenService,
              private dialog: MatDialogRef<RegisterDialogComponent>,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.errorMessage = ""
    this.passwordInputTypes = new Map<string, string>()
    this.passwordInputTypes.set("password", "password")
    this.passwordInputTypes.set("passwordConfirm", "password")
    this.registerForm = this.formBuilder.nonNullable.group ({
      userName: ["", Validators.required],
      displayName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getRegisterForm() {
    return this.registerForm
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

  onRegisterFormSubmit() {
    this.errorMessage = ""
    this.registerForm.controls["password"].updateValueAndValidity()
    this.registerForm.controls["passwordConfirm"].updateValueAndValidity()
    if(!this.registerForm.valid) {
      return
    }
    if(this.registerForm.controls["password"].value != this.registerForm.controls["passwordConfirm"].value) {
      this.errorMessage = "Passwords do not match"
      this.registerForm.controls["password"].setErrors({"incorrect": true})
      this.registerForm.controls["passwordConfirm"].setErrors({"incorrect": true})
      return
    }

    let request = new CreateUserRequest(this.registerForm.value)
    this.userService.register(request).subscribe({
      next: res => this.handleSuccess(res, request),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<User>, request: CreateUserRequest) {
    this.dialog.close()
    this.authTokenService.setCredential(request.getUserName(), request.getPassword())
    this.authService.login(new User(res.body))
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
