import { Component, Inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { AccessService } from "../../../services/http/access.service"
import { ModifyAccessRequest } from "../../../entities/request/modify-access-request"
import { ProjectAccess } from "../../../entities/response/project-response"
import { UserAccess } from "../../../entities/response/user-access-response"


@Component({
  templateUrl: "./access-edit-form.component.html"
})
export class AccessEditFormDialogComponent {

  private errorMessage: string
  private accessEditForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: {project: ProjectAccess, userAccess: UserAccess},
              private dialog: MatDialogRef<AccessEditFormDialogComponent>,
              private accessService: AccessService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.accessEditForm = this.formBuilder.nonNullable.group ({
      accessTypes: [this.data.userAccess.getAccessTypes()],
    })
  }

  getUserName() {
    return this.data.userAccess.getUserName()
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getAccessEditForm() {
    return this.accessEditForm
  }

  canGrantAdmin() {
    return this.data.project.getAccessTypes().includes("ACCESS_OWNER")
  }

  onAccessEditFormSubmit() {
    this.errorMessage = ""
    let request = new ModifyAccessRequest(this.accessEditForm.value)
    this.accessService.modifyAccess(this.data.project.getProjectId(), this.data.userAccess.getAccessId(), request).subscribe({
      next: res => this.handleSuccess(request.getAccessTypes()),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(newAccessTypes: string[]) {
    this.dialog.close(newAccessTypes)
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