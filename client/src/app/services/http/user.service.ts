import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { AuthTokenService } from "../auth/auth-token.service"
import { CreateUserRequest } from "../../entities/request/create-user-request"
import { Endpoints, HttpOptions } from "./http-config"
import { User } from "../../entities/response/user-response"


@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private authTokenService: AuthTokenService,
              private http: HttpClient) { }

  register(createUserRequest: CreateUserRequest): Observable<HttpResponse<User>> {
    this.authTokenService.unsetCredential()
    return this.http.post<User>(Endpoints.userMapping, createUserRequest, HttpOptions)
  }

  login(userName: string, password: string): Observable<HttpResponse<User>> {
    this.authTokenService.setCredential(userName, password)
    return this.http.get<User>(Endpoints.userMapping, HttpOptions)
  }
}