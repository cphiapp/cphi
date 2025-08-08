import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CognitoAuthService } from '../../auth/cognito-auth.service';

@Component({
  selector: 'app-auth-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="auth-demo-card">
      <mat-card-header>
        <mat-card-title>AWS Cognito Authentication Demo</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="isAuthenticated; else noAuth">
          <div class="auth-info">
            <h3>Authentication Status</h3>
            <p><strong>Is Authenticated:</strong> {{ isAuthenticated }}</p>
            
            <h3>User Data</h3>
            <pre class="user-data">{{ userData$ | async | json }}</pre>
            
            <h3>Configuration</h3>
            <pre class="config-data">{{ configuration$ | async | json }}</pre>
          </div>
          
          <div class="actions">
            <button mat-raised-button color="warn" (click)="logout()">
              Logout
            </button>
          </div>
        </div>

        <ng-template #noAuth>
          <div class="login-prompt">
            <p>You are not authenticated. Please log in to continue.</p>
            <button mat-raised-button color="primary" (click)="login()">
              Login with AWS Cognito
            </button>
          </div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .auth-demo-card {
      max-width: 800px;
      margin: 20px auto;
    }
    
    .auth-info {
      margin-bottom: 20px;
    }
    
    .user-data, .config-data {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .actions {
      margin-top: 20px;
    }
    
    .login-prompt {
      text-align: center;
      padding: 40px 20px;
    }
    
    button {
      margin: 10px;
    }
    
    h3 {
      color: #1976d2;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  `]
})
export class AuthDemoComponent implements OnInit {
  private readonly cognitoAuthService = inject(CognitoAuthService);

  configuration$ = this.cognitoAuthService.configuration$;
  userData$ = this.cognitoAuthService.userData$;
  isAuthenticated = false;

  ngOnInit(): void {
    // Check authentication status on component init
    this.cognitoAuthService.checkAuth().subscribe();
    
    // Subscribe to authentication status changes
    this.cognitoAuthService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.warn('authenticated: ', isAuthenticated);
    });
  }

  login(): void {
    this.cognitoAuthService.login();
  }

  logout(): void {
    this.cognitoAuthService.logout();
  }
}