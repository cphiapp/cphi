import { Component } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"

import { CreateProjectRequest } from "../../../entities/request/create-project-request"
import { ProjectAccess } from "../../../entities/response/project-response"
import { ProjectService } from "../../../services/http/project.service"


@Component({
  templateUrl: "./project-create-form.component.html"
})
export class ProjectCreateFormDialogComponent {

  private errorMessage: string
  private projectCreateForm: FormGroup

  constructor(private dialog: MatDialogRef<ProjectCreateFormDialogComponent>,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.projectCreateForm = this.formBuilder.nonNullable.group ({
      projectName : ["", Validators.required]
    })
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getProjectCreateForm() {
    return this.projectCreateForm
  }

  onProjectCreateFormSubmit() {
    this.errorMessage = ""
    if(!this.projectCreateForm.valid) {
      return
    }
    let request = new CreateProjectRequest(this.projectCreateForm.value)
    this.projectService.createProject(request).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<ProjectAccess>) {
    this.dialog.close(new ProjectAccess(res.body))
  }

  private handleFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case HttpStatusCode.BadRequest:
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

}