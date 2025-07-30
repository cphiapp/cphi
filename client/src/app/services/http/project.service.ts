import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { CreateProjectRequest } from "../../entities/request/create-project-request"
import { Endpoints, HttpOptions } from "./http-config"
import { ModifyProjectRequest } from "../../entities/request/modify-project-request"
import { ProjectAccess } from "../../entities/response/project-response"


@Injectable({
  providedIn: "root"
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  createProject(createProjectRequest: CreateProjectRequest): Observable<HttpResponse<ProjectAccess>> {
    return this.http.post<ProjectAccess>(Endpoints.projectMapping, createProjectRequest, HttpOptions)
  }

  getCurrentUserProjects(): Observable<HttpResponse<ProjectAccess[]>> {
    return this.http.get<ProjectAccess[]>(Endpoints.projectMapping, HttpOptions)
  }

  getProject(projectId: string): Observable<HttpResponse<ProjectAccess>> {
    return this.http.get<ProjectAccess>(Endpoints.projectEntityMapping.replace("%1", projectId), HttpOptions)
  }

  modifyProject(projectId: string, modifyProjectRequest: ModifyProjectRequest) {
    return this.http.put(Endpoints.projectEntityMapping.replace("%1", projectId), modifyProjectRequest, HttpOptions)
  }

  deleteProject(projectId: string) {
    return this.http.delete(Endpoints.projectEntityMapping.replace("%1", projectId), HttpOptions)
  }

}