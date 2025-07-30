import { ActivatedRoute } from "@angular/router"
import { Component } from "@angular/core"
import { HttpResponse, HttpErrorResponse, HttpStatusCode } from "@angular/common/http"

import { ProjectAccess } from "../../../entities/response/project-response"
import { ProjectService } from "../../../services/http/project.service"


@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html"
})
export class ProjectDetailsComponent {

  private currentProject: ProjectAccess
  private errorMessage: string

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {
    this.currentProject = new ProjectAccess()
    this.currentProject.setProjectId(this.activatedRoute.snapshot.params["projectId"])
    this.currentProject.setMissingProjectName()
    this.currentProject.setMissingProjectAccess()

    this.projectService.getProject(this.activatedRoute.snapshot.params["projectId"]).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err, this.activatedRoute.snapshot.params["projectId"])
    })
  }

  private handleSuccess(res: HttpResponse<ProjectAccess>) {
    this.currentProject = new ProjectAccess(res.body)
  }

  private handleFailure(err: HttpErrorResponse, projectId: string) {
    switch(err.status) {
      case HttpStatusCode.BadRequest:
      case HttpStatusCode.Forbidden:
        this.errorMessage = err.error
        break
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

  getCurrentProject() {
    return this.currentProject
  }

  getErrorMessage() {
    return this.errorMessage
  }

}