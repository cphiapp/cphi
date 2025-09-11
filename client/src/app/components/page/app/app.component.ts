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
    // Add delay to allow OAuth callback processing
    setTimeout(() => {
      this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
        const currentUrl = this.router.url
        
        // Don't redirect if URL contains OAuth callback parameters
        if (currentUrl.includes('code=') || currentUrl.includes('state=')) {
          return;
        }
        
        if (isAuthenticated && (currentUrl === '/' || currentUrl === '/login')) {
          // If authenticated and on root or login page, redirect to appointments
          this.router.navigate(['/appointments'])
        } else if (!isAuthenticated && currentUrl !== '/login' && currentUrl !== '/') {
          // If not authenticated and trying to access protected route, redirect to login
          this.router.navigate(['/login'])
        }
      })
    }, 1000); // Give OAuth callback time to process
  }
}