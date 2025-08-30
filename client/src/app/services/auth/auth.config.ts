import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';


export const cognitoAuthConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BE7MaqC5T',
    redirectUrl: 'https://d15dzv70fdtos7.cloudfront.net',
    postLogoutRedirectUri: 'https://d15dzv70fdtos7.cloudfront.net',
    clientId: '1dheen19kd0a5i5364ip8e43v1',
    scope: 'email openid phone',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug, // Enable debug mode to see what's happening
    historyCleanupOff: false,
    autoUserInfo: true,
    ignoreNonceAfterRefresh: true,
    customParamsAuthRequest: {},
    customParamsCodeRequest: {},
    customParamsRefreshTokenRequest: {},
    customParamsEndSessionRequest: {},
  },
};
