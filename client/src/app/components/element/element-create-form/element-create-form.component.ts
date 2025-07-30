import { Component, Inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { CreateElementRequest } from "../../../entities/request/create-element-request"
import { Element } from "../../../entities/response/element-response"
import { ElementService } from "../../../services/http/element.service"
import { ProjectAccess } from "../../../entities/response/project-response"
import { RoleMapping } from "../../../services/auth/role-mapping"


@Component({
  templateUrl: "./element-create-form.component.html"
})
export class ElementCreateFormDialogComponent {

  private errorMessage: string
  private elementCreateForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: {project: ProjectAccess},
              private dialog: MatDialogRef<ElementCreateFormDialogComponent>,
              private elementService: ElementService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.elementCreateForm = this.formBuilder.nonNullable.group ({
      elementName : ["", Validators.required],
      content: [""],
      elementType: ["TYPE_OTHER",Validators.required]
    })
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getElementCreateForm() {
    return this.elementCreateForm
  }

  canCreate(elementType: string) {
    return RoleMapping.getElementCreateRoles(elementType).some(accessType => this.data.project.getAccessTypes().includes(accessType))
  }

  onElementCreateFormSubmit() {
    this.errorMessage = ""
    if(!this.elementCreateForm.valid) {
      return
    }
    let request = new CreateElementRequest(this.elementCreateForm.value)
    this.elementService.createElement(this.data.project.getProjectId(), request).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<Element>) {
    this.dialog.close(new Element(res.body))
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