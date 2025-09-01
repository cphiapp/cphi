import { Component } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"

import { CreateAppointmentRequest } from "../../../entities/request/create-appointment-request"
import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentService } from "../../../services/http/appointment.service"


@Component({
  templateUrl: "./appointment-create-form.component.html"
})
export class AppointmentCreateFormDialogComponent {

  errorMessage: string
  appointmentCreateForm: FormGroup

  constructor(private dialog: MatDialogRef<AppointmentCreateFormDialogComponent>,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.appointmentCreateForm = this.formBuilder.nonNullable.group ({
      appointmentTime : ["", Validators.required]
    })
  }

  onAppointmentCreateFormSubmit() {
    this.errorMessage = ""
    if(!this.appointmentCreateForm.valid) {
      return
    }
    let request = new CreateAppointmentRequest(this.appointmentCreateForm.value)
    this.appointmentService.createAppointment(request).subscribe({
      next: res => this.handleSuccess(res),
      error: err => this.handleFailure(err)
    })
  }

  private handleSuccess(res: HttpResponse<Appointment>) {
    var appointment = new Appointment(res.body)
    this.dialog.close(appointment)
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