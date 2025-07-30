import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"

import { AuthService } from "../../../services/auth/auth.service"
import { RegisterDialogComponent } from "../../element/register/register.component"
import { UserService } from "../../../services/http/user.service"
import { User } from "../../../entities/response/user-response"


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  private errorMessage: string
  private loginForm: FormGroup

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.errorMessage = ""
    this.loginForm = this.formBuilder.nonNullable.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  openRegisterDialog() {
    let dialog = this.dialog.open(RegisterDialogComponent).updateSize("30%")
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getLoginForm() {
    return this.loginForm
  }

  onLoginFormSubmit() {
    this.errorMessage = ""
    if(!this.loginForm.valid) {
      return
    }

    this.userService.login(this.loginForm.controls["userName"].value, this.loginForm.controls["password"].value).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<User>) {
    this.authService.login(new User(res.body))
  }

  private handleFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case HttpStatusCode.Forbidden:
      case HttpStatusCode.Unauthorized:
        this.errorMessage = "Invalid username/password."
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