import { Component, Inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentService } from "../../../services/http/appointment.service"
import { ModifyAppointmentRequest } from "../../../entities/request/modify-appointment-request"
import { AppointmentStatus } from "../../../entities/response/appointment-status-response"


@Component({
  templateUrl: "./appointment-edit-form.component.html"
})
export class AppointmentEditFormDialogComponent {

  private errorMessage: string
  private appointmentEditForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: {appointment: Appointment},
              private dialog: MatDialogRef<AppointmentEditFormDialogComponent>,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.appointmentEditForm = this.formBuilder.nonNullable.group ({
      status: ["", Validators.required],
      comment: ["", Validators.required]
    })
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getAppointmentEditForm() {
    return this.appointmentEditForm
  }

  onAppointmentEditFormSubmit() {
    this.errorMessage = ""
    if(!this.appointmentEditForm.valid) {
      return
    }
    let request = new ModifyAppointmentRequest(this.appointmentEditForm.value)
    this.appointmentService.modifyAppointment(this.data.appointment.getAppointmentId(), request).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }
  private handleSuccess(newAppointmentStatus: HttpResponse<AppointmentStatus>) {
    this.dialog.close(new AppointmentStatus(newAppointmentStatus.body))
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