import { Component, OnInit, inject } from "@angular/core"
import { Router } from "@angular/router"
// Authentication service removed


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  private router = inject(Router)
  
  isAuthenticated = true // Always authenticated since auth is disabled

  constructor() {}

  ngOnInit(): void {
    // Authentication disabled - redirect directly to appointments
    this.router.navigate(['/appointments'])
  }

  // Login methods disabled
  loginWithCognito(): void {
    this.router.navigate(['/appointments'])
  }

  logoutFromCognito(): void {
    this.router.navigate(['/appointments'])
  }

}