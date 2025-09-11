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
  authResult$ = this.oidcSecurityService.getAuthenticationResult()
  isAuthenticated$ = this.oidcSecurityService.isAuthenticated$.pipe(
    map(({ isAuthenticated }) => isAuthenticated)
  );

  getParsedToken(): Observable<any> {
    return this.oidcSecurityService.getPayloadFromIdToken()
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    console.log('Initiating logout...')
    this.oidcSecurityService.logoff().subscribe({
      next: (result) => {
        console.log('Logout successful:', result)
      },
      error: (err) => {
        console.error('Logout error:', err)
        // Clear local storage and force redirect
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = '/login'
      }
    });
  }
}
