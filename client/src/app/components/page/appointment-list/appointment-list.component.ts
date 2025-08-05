import { Component, ViewChild } from "@angular/core"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentService } from "../../../services/http/appointment.service"
import { HttpErrorResponse, HttpResponse } from "@angular/common/http"

@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html"
})
export class AppointmentListComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["id", "appointmentTime", "status"]
  private errorMessage: string
  private appointments: Appointment[]
  private appointmentData: MatTableDataSource<Appointment>

  constructor(private appointmentService: AppointmentService) {
    this.errorMessage = ""
    this.appointments = []
    this.appointmentData = new MatTableDataSource(this.appointments)

    // this.appointmentService.getCurrentUserAppointments().subscribe({
    //   next: res => this.handleGetSuccess(res),
    //   error: err => this.handleGetFailure(err)
    // })

    this.appointments = [
        new Appointment({id: '1', appointmentTime: '2025-12-01T10:00:00Z', statusInfo: {status: 'SCHEDULED'}}),
        new Appointment({id: '2', appointmentTime: '2025-12-02T14:30:00Z', statusInfo: {status: 'COMPLETED'}}),
        new Appointment({id: '3', appointmentTime: '2025-12-03T09:00:00Z', statusInfo: {status: 'CANCELLED'}})
    ];
    this.appointmentData = new MatTableDataSource(this.appointments);
    setTimeout(() => this.appointmentData.paginator = this.paginator);
  }

  private handleGetSuccess(res: HttpResponse<any>) {
    this.appointments = res.body.appointments.map(appointment => new Appointment(appointment));
    this.appointmentData = new MatTableDataSource(this.appointments);
    this.appointmentData.paginator = this.paginator;
  }

  private handleGetFailure(err: HttpErrorResponse) {
    this.errorMessage = "Failed to load appointments."
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getColumns() {
    return this.columns
  }

  getAppointmentData() {
    return this.appointmentData
  }
}