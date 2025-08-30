import { Component, OnInit, inject } from "@angular/core"
import { Router } from "@angular/router"
import { CognitoAuthService } from "../../../services/auth/auth.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private cognitoAuthService: CognitoAuthService,
              private router: Router) {}

  ngOnInit(): void {
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