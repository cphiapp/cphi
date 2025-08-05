import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/http/appointment.service';
import { Appointment } from '../../../entities/response/appointment-response';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModifyAppointmentRequest } from '../../../entities/request/modify-appointment-request';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
})
export class AppointmentDetailsComponent {
  appointment: Appointment;
  errorMessage: string;
  modifyAppointmentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder
  ) {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    // if (appointmentId) {
      // Assuming you will add a getAppointmentById method to your service
      // this.appointmentService.getAppointment(appointmentId).subscribe({
      //   next: (response) => {
      //     this.appointment = new Appointment(response.body);
      //     this.initForm();
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     this.errorMessage = 'Failed to load appointment details.';
      //   },
      // });
    // }

    this.appointment = new Appointment({
      id: '123',
      appointmentTime: '2025-10-10T10:00:00Z',
      statusInfo: { status: 'SCHEDULED' }
    });

    this.modifyAppointmentForm = this.formBuilder.group({
      status: ['', Validators.required],
      comment: [''],
    });
    this.initForm();
  }

  initForm(): void {
    this.modifyAppointmentForm.patchValue({
      status: this.appointment.getStatus(),
    });
  }

  onModifyAppointmentSubmit(): void {
    if (this.modifyAppointmentForm.valid) {
      const request = new ModifyAppointmentRequest(this.modifyAppointmentForm.value);
      this.appointmentService.modifyAppointment(this.appointment.getId(), request).subscribe({
        next: () => {
          // Handle success
        },
        error: (err) => {
          // Handle error
        },
      });
    }
  }
}