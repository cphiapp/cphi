import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

export const cognitoAuthConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BE7MaqC5T',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: '1dheen19kd0a5i5364ip8e43v1',
    scope: 'openid email phone',
    responseType: 'code',
    silentRenew: false,
    useRefreshToken: false,
    logLevel: LogLevel.Error,
  },
};
