import { Component, OnInit } from '@angular/core'
import { CognitoAuthService } from '../../../services/auth/auth.service'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule]
})
export class ProfileComponent implements OnInit {

  userName = ''
  userMobile = ''

  constructor(private cognitoAuthService: CognitoAuthService) { }

  ngOnInit(): void {
    this.cognitoAuthService.userData$.subscribe(userData => {
      console.log('Profile page user data:', userData);
      if (userData && userData.userData) {
        const claims = userData.userData;
        this.userName = claims.username || '';
        this.userMobile = claims.phone_number || '';
      }
    });
  }

}