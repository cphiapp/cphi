import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { cognitoAuthConfig } from './cognito-auth.config';

@NgModule({
  imports: [
    AuthModule.forRoot(cognitoAuthConfig)
  ],
  exports: [AuthModule],
})
export class CognitoAuthModule {}