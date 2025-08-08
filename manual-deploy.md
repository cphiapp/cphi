# Manual Deployment Guide

## 🚀 Your Angular app with Cognito authentication is ready!

### Build Output Location:
```
client/dist/ecms-client/browser/
```

### Files to Upload:
- `index.html`
- `main-*.js`
- `chunk-*.js` 
- `styles-*.css`
- `polyfills-*.js`
- Any other assets

## Deployment Steps:

### 1. Upload to S3
Upload all files from `client/dist/ecms-client/browser/` to your S3 bucket that serves your CloudFront distribution.

### 2. Set Cache Headers
- **index.html**: `Cache-Control: no-cache, no-store, must-revalidate`
- **All other files**: `Cache-Control: public, max-age=31536000`

### 3. Invalidate CloudFront
Create an invalidation for `/*` on your CloudFront distribution.

### 4. Test Authentication
Visit: https://d15dzv70fdtos7.cloudfront.net

## What You'll See:

### Login Page Features:
- **"Sign in with Cognito"** button (primary authentication)
- **Legacy login form** (your existing username/password)
- **Responsive design** with Material UI

### After Cognito Login:
- **Welcome message** with user data
- **User profile information** from Cognito
- **Logout button** that properly clears session

## Authentication Configuration:
✅ **Client ID**: 7jo1trm7kc0uqgj13u5m1b9ed2  
✅ **Authority**: https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sMGvqAN78  
✅ **Redirect URL**: https://d15dzv70fdtos7.cloudfront.net  
✅ **Scope**: email openid phone  
✅ **Response Type**: code  

## How It Works:

1. **User clicks "Sign in with Cognito"**
2. **Redirects to AWS Cognito Hosted UI**
3. **User enters credentials**
4. **Redirects back with authorization code**
5. **Angular exchanges code for JWT tokens**
6. **User is authenticated and can access protected routes**

## To Protect Routes:
Add to your routing configuration:
```typescript
import { CognitoAuthGuard } from './auth/cognito-auth.guard';

{
  path: 'protected',
  component: YourComponent,
  canActivate: [CognitoAuthGuard]
}
```

## Troubleshooting:

### If authentication doesn't work:
1. Check browser console for errors
2. Verify redirect URL matches exactly
3. Ensure Cognito client is configured for your domain
4. Check that all callback URLs are registered in Cognito

### For debugging:
Set `logLevel: 5` in `client/src/app/auth/cognito-auth.config.ts`

## Files Modified:
- ✅ `app.module.ts` - Added CognitoAuthModule
- ✅ `login.component.ts` - Added Cognito authentication
- ✅ `login.component.html` - Updated UI with Cognito login
- ✅ `app.component.ts` - Added auth initialization
- ✅ Created auth module, service, and guard

Your app is ready for production! 🎉