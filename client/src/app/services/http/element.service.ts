import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { CreateElementRequest } from "../../entities/request/create-element-request"
import { Element } from "../../entities/response/element-response"
import { Endpoints, HttpOptions } from "./http-config"
import { GenerateResponse } from "../../entities/response/generate-response"
import { ModifyElementRequest } from "../../entities/request/modify-element-request"


@Injectable({
  providedIn: "root"
})
export class ElementService {

  constructor(private http: HttpClient) { }

  createElement(projectId: string, createElementRequest: CreateElementRequest): Observable<HttpResponse<Element>> {
    return this.http.post<Element>(Endpoints.elementMapping.replace("%1", projectId), createElementRequest, HttpOptions)
  }

  getElementsByProject(projectId: string): Observable<HttpResponse<Element[]>> {
    return this.http.get<Element[]>(Endpoints.elementMapping.replace("%1", projectId), HttpOptions)
  }

  modifyElement(projectId: string, elementId: string, modifyElementRequest: ModifyElementRequest) {
    return this.http.put(Endpoints.elementEntityMapping.replace("%1", projectId).replace("%2", elementId), modifyElementRequest, HttpOptions)
  }

  deleteElement(projectId: string, elementId: string) {
    return this.http.delete(Endpoints.elementEntityMapping.replace("%1", projectId).replace("%2", elementId), HttpOptions)
  }

  generateElement(projectId: string, elementId: string) {
    return this.http.get<GenerateResponse>(Endpoints.elementEntityMapping.replace("%1", projectId).replace("%2", elementId), HttpOptions)
  }

}