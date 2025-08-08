import { Component, OnInit, inject } from "@angular/core"
import { Router } from "@angular/router"
import { CognitoAuthService } from "../../../auth/cognito-auth.service"


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  private cognitoAuthService = inject(CognitoAuthService)
  private router = inject(Router)
  
  isAuthenticated = false
  userData$ = this.cognitoAuthService.userData$

  constructor() {}

  ngOnInit(): void {
    // Check authentication status on component init
    this.cognitoAuthService.checkAuth().subscribe()
    
    // Subscribe to authentication status changes
    this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
      console.warn('authenticated: ', isAuthenticated)
      
      // Redirect to appointments page if authenticated
      if (isAuthenticated) {
        this.router.navigate(['/appointments'])
      }
    })
  }

  // Cognito login method
  loginWithCognito(): void {
    this.cognitoAuthService.login()
  }

  // Cognito logout method
  logoutFromCognito(): void {
    this.cognitoAuthService.logout()
  }

}