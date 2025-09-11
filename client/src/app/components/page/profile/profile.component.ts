import { Component, OnInit } from '@angular/core'
// Authentication service removed

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userEmail = 'test-user@example.com'
  userName = 'Test User'
  userGivenName = 'Test'
  userFamilyName = 'User'

  constructor() { }

  ngOnInit(): void {
    // Authentication disabled - using fixed test user data
  }

}