import { Component, Inject } from "@angular/core"
import { FormGroup, FormBuilder } from "@angular/forms"
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { Element } from "../../../entities/response/element-response"
import { ElementService } from "../../../services/http/element.service"
import { ModifyElementRequest } from "../../../entities/request/modify-element-request"


@Component({
  templateUrl: "./element-edit-form.component.html"
})
export class ElementEditFormDialogComponent {

  private errorMessage: string
  private elementEditForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: {element: Element},
              private dialog: MatDialogRef<ElementEditFormDialogComponent>,
              private elementService: ElementService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.elementEditForm = this.formBuilder.nonNullable.group ({
      content: [""]
    })
    this.elementEditForm.controls["content"].setValue(this.data.element.getContent())
  }

  getElementName() {
    return this.data.element.getElementName()
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getElementEditForm() {
    return this.elementEditForm
  }

  onElementEditFormSubmit() {
    this.errorMessage = ""
    let request = new ModifyElementRequest(this.elementEditForm.value)
    this.elementService.modifyElement(this.data.element.getProjectId(), this.data.element.getElementId(), request).subscribe({
      next: res => this.handleSuccess(request.getContent()),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(newContent: string) {
    this.dialog.close(newContent)
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