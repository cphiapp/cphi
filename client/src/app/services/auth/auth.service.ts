import { Injectable, inject } from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { Observable, map } from 'rxjs';
import { cognitoAuthConfig } from './auth.config';

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
    console.log('Initiating custom logout...')
    
    // Clear local oidc client session
    localStorage.clear()
    sessionStorage.clear()

    // Construct the Cognito logout URL from the static config
    const config = cognitoAuthConfig.config as OpenIdConfiguration;
    const clientId = config.clientId;
    const postLogoutRedirectUri = config.postLogoutRedirectUri || window.location.origin;
    
    // The user's snippet suggests a custom domain format.
    // The authority is 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BE7MaqC5T'
    // The user pool ID is 'us-east-1_BE7MaqC5T'
    // The user's snippet domain was 'us-east-1be7maqc5t.auth.us-east-1.amazoncognito.com'
    // This implies a custom domain is being used. We will construct the URL based on this pattern.
    // The typo 'us-east-1be7maqc5t' is likely a flattened version of the user pool ID.
    const userPoolId = (config.authority || '').split('/').pop() || ''
    const cognitoDomain = userPoolId.replace('_', '') + '.auth.us-east-1.amazoncognito.com'
    
    const logoutUrl = `https://${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(postLogoutRedirectUri)}`
    
    console.log('Redirecting to Cognito logout URL:', logoutUrl)
    window.location.href = logoutUrl
  }
}
