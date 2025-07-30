import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { CreateAccessRequest } from "../../entities/request/create-access-request"
import { Endpoints, HttpOptions } from "./http-config"
import { ModifyAccessRequest } from "../../entities/request/modify-access-request"
import { UserAccess } from "../../entities/response/user-access-response"


@Injectable({
  providedIn: "root"
})
export class AccessService {

  constructor(private http: HttpClient) { }

  createAccess(projectId: string, createAccessRequest: CreateAccessRequest): Observable<HttpResponse<UserAccess>> {
    return this.http.post<UserAccess>(Endpoints.accessMapping.replace("%1", projectId), createAccessRequest, HttpOptions)
  }

  getUsersByProject(projectId: string): Observable<HttpResponse<UserAccess[]>> {
    return this.http.get<UserAccess[]>(Endpoints.accessMapping.replace("%1", projectId), HttpOptions)
  }

  modifyAccess(projectId: string, accessId: string, modifyAccessRequest: ModifyAccessRequest) {
    return this.http.put(Endpoints.accessEntityMapping.replace("%1", projectId).replace("%2", accessId), modifyAccessRequest, HttpOptions)
  }

  deleteAccess(projectId: string, accessId: string) {
    return this.http.delete(Endpoints.accessEntityMapping.replace("%1", projectId).replace("%2", accessId), HttpOptions)
  }

}