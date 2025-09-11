import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

// Dynamic URL configuration based on environment
const getBaseUrl = (): string => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }
  
  // Production CloudFront URL
  return 'https://d15dzv70fdtos7.cloudfront.net';
};

const baseUrl = getBaseUrl();

export const cognitoAuthConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BE7MaqC5T',
    redirectUrl: baseUrl,
    postLogoutRedirectUri: baseUrl,
    clientId: '1dheen19kd0a5i5364ip8e43v1',
    scope: 'email openid phone aws.cognito.signin.user.admin',
    responseType: 'code',
    silentRenew: false, // Disable silent renew for now to avoid issues
    useRefreshToken: false, // Disable refresh tokens for now
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug, // Enable debug mode to see what's happening
    historyCleanupOff: true, // Don't clean up history
    autoUserInfo: false, // Don't auto-fetch user info
    ignoreNonceAfterRefresh: true,
    triggerAuthorizationResultEvent: true,
    secureRoutes: [],
    customParamsAuthRequest: {},
    customParamsCodeRequest: {},
    customParamsRefreshTokenRequest: {},
    customParamsEndSessionRequest: {},
  },
};
