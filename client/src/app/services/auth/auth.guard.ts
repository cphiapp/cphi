import { Router } from "@angular/router"
import { Injectable } from "@angular/core"

import { AuthService } from "./auth.service"


@Injectable({
  providedIn: "root"
})
export class AuthGuard {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate() {
    // OLD CODE - Temporarily commented out for UI development
    // if (this.authService.getLoggedIn()) {
    //   return true
    // }
    // else {
    //   this.router.navigate(["/login"])
    //   return false
    // }

    // NEW CODE - Always allow access
    return true;
  }

}