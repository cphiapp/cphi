import { Injectable, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();
  userData$ = this.oidcSecurityService.userData$;
  isAuthenticated$ = this.oidcSecurityService.isAuthenticated$.pipe(
    map(({ isAuthenticated }) => isAuthenticated)
  );

  checkAuth(): Observable<any> {
    return this.oidcSecurityService.checkAuth();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    // Clear session storage
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    
    // Use the hosted UI logout URL
    const clientId = '1dheen19kd0a5i5364ip8e43v1';
    const logoutUri = encodeURIComponent('https://d15dzv70fdtos7.cloudfront.net');
    const logoutUrl = `https://us-east-1be7maqc5t.auth.us-east-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
    
    window.location.href = logoutUrl;
  }

  getAccessToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }

  getIdToken(): Observable<string> {
    return this.oidcSecurityService.getIdToken();
  }
}
