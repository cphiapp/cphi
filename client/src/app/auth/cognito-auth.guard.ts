import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CognitoAuthService } from './cognito-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthGuard implements CanActivate {
  private readonly cognitoAuthService = inject(CognitoAuthService);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.cognitoAuthService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Redirect to login page if not authenticated
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}