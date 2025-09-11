import { Component, OnInit, inject } from "@angular/core"
import { Router } from "@angular/router"
import { CognitoAuthService } from "../../../services/auth/auth.service"


@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"]
})
export class MenubarComponent implements OnInit {

  private cognitoAuthService = inject(CognitoAuthService)

  isAuthenticated = false
  userData$ = this.cognitoAuthService.userData$
  userEmail = ''
  userName = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to authentication status
    this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })

    // Subscribe to user data
    this.userData$.subscribe(userData => {
      if (userData) {
        // Access user data properties safely
        const userDataObj = userData as any
        this.userEmail = userDataObj.email || userDataObj.preferred_username || ''
        this.userName = userDataObj.given_name || userDataObj.name || userDataObj.preferred_username || this.userEmail.split('@')[0] || 'User'
      }
    })
  }

  isLoggedIn() {
    return this.isAuthenticated
  }

  logout() {
    this.cognitoAuthService.logout()
  }

  goToProfile() {
    this.router.navigate(['/profile'])
  }

  goToSettings() {
    this.router.navigate(['/settings'])
  }
}