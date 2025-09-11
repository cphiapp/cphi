import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
// Authentication service removed


@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"]
})
export class MenubarComponent implements OnInit {

  isAuthenticated = true // Always authenticated since auth is disabled
  userEmail = 'test-user@example.com'
  userName = 'Test User'

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Authentication disabled - using fixed test user
  }

  isLoggedIn() {
    return this.isAuthenticated
  }

  logout() {
    // Logout disabled - redirect to home
    this.router.navigate(['/'])
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  goToSettings() {
    this.router.navigate(['/settings'])
  }
}