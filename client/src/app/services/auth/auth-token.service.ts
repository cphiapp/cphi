import { Injectable } from "@angular/core"
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import { OidcSecurityService } from "angular-auth-oidc-client";


@Injectable({
    providedIn: "root"
})
export class AuthTokenService {

    constructor(private oidcSecurityService : OidcSecurityService) {}

    getHeaders() {
        return this.oidcSecurityService.getAccessToken().pipe(
            map(token => {
                console.log('Sending access token:', token ? 'Token present' : 'No token');
                return {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }),
                    withCredentials: true,
                    observe: 'response' as const
                };
            })
        )
    };
}