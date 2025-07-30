import { Component, Inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { ModifyProjectRequest } from "../../../entities/request/modify-project-request"
import { ProjectAccess } from "../../../entities/response/project-response"
import { ProjectService } from "../../../services/http/project.service"


@Component({
  templateUrl: "./project-edit-form.component.html"
})
export class ProjectEditFormDialogComponent {

  private errorMessage: string
  private projectEditForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: {project: ProjectAccess},
              private dialog: MatDialogRef<ProjectEditFormDialogComponent>,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.projectEditForm = this.formBuilder.nonNullable.group ({
      projectName: ["", Validators.required]
    })
    this.projectEditForm.controls["projectName"].setValue(this.data.project.getProjectName())
  }

  getProjectName() {
    return this.data.project.getProjectName()
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getProjectEditForm() {
    return this.projectEditForm
  }

  onProjectEditFormSubmit() {
    this.errorMessage = ""
    if(!this.projectEditForm.valid) {
      return
    }
    let request = new ModifyProjectRequest(this.projectEditForm.value)
    this.projectService.modifyProject(this.data.project.getProjectId(), request).subscribe({
      next: res => this.handleSuccess(request.getProjectName()),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(newProjectName: string) {
    this.dialog.close(newProjectName)
  }

  private handleFailure(err: HttpErrorResponse) {
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

}