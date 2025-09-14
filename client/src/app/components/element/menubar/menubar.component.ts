import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CognitoAuthService } from "../../../services/auth/auth.service"


@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"]
})
export class MenubarComponent implements OnInit {

  isAuthenticated = false
  userEmail = ''
  userName = ''

  constructor(private router: Router, private cognitoAuthService: CognitoAuthService) { }

  ngOnInit(): void {
    this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
      console.log('Authentication status:', this.isAuthenticated)
    })

    this.cognitoAuthService.userData$.subscribe(userData => {
      console.log('User data received:', userData)
      if (userData && userData.userData) {
        this.userName = userData.userData.name || ''
        this.userEmail = userData.userData.email || ''
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