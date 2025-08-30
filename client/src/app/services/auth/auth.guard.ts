import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CognitoAuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CognitoAuthGuard {

  constructor(private cognitoAuthService: CognitoAuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.cognitoAuthService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}