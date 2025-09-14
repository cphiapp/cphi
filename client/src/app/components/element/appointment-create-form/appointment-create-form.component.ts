import { Component } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from "@angular/common/http"
import { MatDialogRef } from "@angular/material/dialog"
import { timeout, catchError } from "rxjs/operators"
import { throwError } from "rxjs"

import { CreateAppointmentRequest } from "../../../entities/request/create-appointment-request"
import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentService } from "../../../services/http/appointment.service"


@Component({
  templateUrl: "./appointment-create-form.component.html"
})
export class AppointmentCreateFormDialogComponent {

  errorMessage: string
  appointmentCreateForm: FormGroup
  minDate: string

  get appointmentForm() {
    return this.appointmentCreateForm
  }

  constructor(private dialog: MatDialogRef<AppointmentCreateFormDialogComponent>,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {
    this.errorMessage = ""
    this.appointmentCreateForm = this.formBuilder.nonNullable.group ({
      appointmentTime : ["", [Validators.required]]
    })
    
    const now = new Date()
    // Set minimum date to now (for datetime-local input)
    this.minDate = now.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:mm
    
    // Set default appointment time to tomorrow at 9:00 AM
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)
    
    this.appointmentCreateForm.patchValue({
      appointmentTime: tomorrow.toISOString().slice(0, 16)
    })
  }

  onAppointmentCreateFormSubmit() {
    console.log('Form submission started')
    console.log('Form valid:', this.appointmentCreateForm.valid)
    console.log('Form value:', this.appointmentCreateForm.value)
    
    this.errorMessage = ""
    if(!this.appointmentCreateForm.valid) {
      this.errorMessage = "Please fill in all required fields"
      console.log('Form validation failed')
      return
    }
    
    const appointmentTime = this.appointmentCreateForm.get('appointmentTime')?.value
    if (!appointmentTime) {
      this.errorMessage = "Please select an appointment date and time"
      return
    }
    
    // Validate that the date is in the future
    const selectedDate = new Date(appointmentTime)
    const now = new Date()
    
    if (selectedDate <= now) {
      this.errorMessage = "Appointment time must be in the future"
      return
    }
    
    // Append seconds for the backend
    const fullTimestamp = appointmentTime + ':00'
    console.log('Formatted timestamp for backend:', fullTimestamp)
    
    let request = new CreateAppointmentRequest({
      appointmentTime: fullTimestamp
    })
    
    console.log('Creating appointment with request:', request)
    console.log('Making HTTP request to backend...')
    
    // Debug authentication
    console.log('Checking authentication status...')
    
    this.appointmentService.createAppointment(request)
      .pipe(
        timeout(30000), // 30 second timeout
        catchError(err => {
          console.log('Request error or timeout:', err)
          return throwError(() => err)
        })
      )
      .subscribe({
        next: res => {
          console.log('HTTP request successful, response received:', res)
          this.handleSuccess(res)
        },
        error: err => {
          console.log('HTTP request failed, error received:', err)
          this.handleFailure(err)
        }
      })
  }

  onCancel() {
    console.log('Appointment creation cancelled')
    this.dialog.close()
  }

  private handleSuccess(res: HttpResponse<any>) {
    console.log('Appointment created successfully:', res.body)
    // The backend returns CreateAppointmentResponse, convert to Appointment format
    const appointmentData = {
      id: res.body.id,
      appointmentTime: res.body.appointmentTime,
      status: res.body.status
    }
    this.dialog.close(appointmentData)
  }

  private handleFailure(err: any) {
    console.error('Appointment creation failed:', err)
    console.error('Error type:', typeof err)
    console.error('Error name:', err.name)
    console.error('Error message:', err.message)
    
    // Handle timeout errors
    if (err.name === 'TimeoutError') {
      this.errorMessage = "Request timed out. Please check your connection and try again."
      return
    }
    
    // Handle HTTP errors
    if (err instanceof HttpErrorResponse) {
      console.error('HTTP Error status:', err.status)
      console.error('HTTP Error body:', err.error)
      
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message
      } else {
        switch(err.status) {
          case HttpStatusCode.BadRequest:
            this.errorMessage = "Invalid appointment data. Please check your input."
            break
          case HttpStatusCode.Unauthorized:
            this.errorMessage = "You are not authorized to create appointments. Please log in again."
            break
          case HttpStatusCode.Forbidden:
            this.errorMessage = "You don't have permission to create appointments."
            break
          case 0:
            this.errorMessage = "Could not reach the server. Please check your internet connection or try again later."
            break
          case 500:
            this.errorMessage = "Server error occurred. Please try again later."
            break
          default:
            this.errorMessage = `Failed to create appointment. Error: ${err.status} - ${err.statusText || 'Unknown error'}`
            break
        }
      }
    } else {
      // Handle other types of errors
      this.errorMessage = `An unexpected error occurred: ${err.message || 'Unknown error'}`
    }
  }

}