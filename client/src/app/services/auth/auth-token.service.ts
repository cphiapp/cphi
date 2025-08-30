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
        return this.oidcSecurityService.getIdToken().pipe(
            map(token => {
                return {
                    headers: new HttpHeaders({
                        "Access-Control-Allow-Origin": "*",
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