import { Component, inject } from "@angular/core"
import { CognitoAuthService } from "../../../services/auth/auth.service"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class LoginComponent {

  private cognitoAuthService = inject(CognitoAuthService)

  constructor() {}

  loginWithCognito(): void {
    this.cognitoAuthService.login()
  }

}