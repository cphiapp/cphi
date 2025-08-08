import { Component, OnInit, inject } from "@angular/core"
import { Router } from "@angular/router"
import { CognitoAuthService } from "../../../auth/cognito-auth.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private cognitoAuthService = inject(CognitoAuthService)
  private router = inject(Router)

  ngOnInit(): void {
    // Initialize authentication check when app starts
    this.cognitoAuthService.checkAuth().subscribe()
    
    // Handle initial routing based on authentication status
    this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      const currentUrl = this.router.url
      
      if (isAuthenticated && (currentUrl === '/' || currentUrl === '/login')) {
        // If authenticated and on root or login page, redirect to appointments
        this.router.navigate(['/appointments'])
      } else if (!isAuthenticated && currentUrl !== '/login' && currentUrl !== '/') {
        // If not authenticated and trying to access protected route, redirect to login
        this.router.navigate(['/login'])
      }
    })
  }
}