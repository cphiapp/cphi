import { Component, OnInit } from '@angular/core'
import { CognitoAuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData$ = this.cognitoAuthService.userData$
  userEmail = ''
  userName = ''
  userGivenName = ''
  userFamilyName = ''

  constructor(private cognitoAuthService: CognitoAuthService) { }

  ngOnInit(): void {
    this.userData$.subscribe(userData => {
      if (userData) {
        const userDataObj = userData as any
        this.userEmail = userDataObj.email || userDataObj.preferred_username || ''
        this.userName = userDataObj.name || userDataObj.preferred_username || this.userEmail.split('@')[0] || 'User'
        this.userGivenName = userDataObj.given_name || ''
        this.userFamilyName = userDataObj.family_name || ''
      }
    })
  }

}