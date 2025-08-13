import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

import { AuthTokenService } from "./auth-token.service"
import { User } from "../../entities/response/user-response"


@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isLoggedIn: boolean
  private currentUser: User

  constructor(private router: Router,
              private authTokenService: AuthTokenService) {
      this.isLoggedIn = false
      this.currentUser = undefined
  }

  getLoggedIn() {
    return this.isLoggedIn
  }

  isAdmin() {
    return this.currentUser.getRoleName() == "ADMIN"
  }

  getCurrentUser(): User {
    return this.currentUser
  }

  login(user: User) {
      this.isLoggedIn = true
      this.currentUser = user
      this.router.navigate(["/appointments"])
  }

  logout() {
    this.authTokenService.unsetCredential()
    this.isLoggedIn = false
    this.currentUser = undefined
    this.router.navigate([""])
  }

}