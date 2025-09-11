import { Component, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"

import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentCreateFormDialogComponent } from "../../element/appointment-create-form/appointment-create-form.component"
import { AppointmentService } from "../../../services/http/appointment.service"
// Authentication service removed
import { Appointments } from "../../../entities/response/appointments-response"


@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html",
  styleUrls: ["./appointment-list.component.css"]
})
export class AppointmentListComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  columns = ["id", "date", "status", "actions"]
  errorMessage: string
  appointments : Appointment[]
  appointmentsData: MatTableDataSource<Appointment>
  searchForm: FormGroup
  isAdmin: boolean

  constructor(private dialog: MatDialog,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {
    this.isAdmin = false
    this.errorMessage = ""
    this.appointments = []
    this.appointmentsData = new MatTableDataSource(this.appointments)
    this.searchForm = this.formBuilder.nonNullable.group({
      pattern: ["", Validators.minLength(4)]
    })

    // Authentication disabled - load appointments directly
    this.isAdmin = false // No admin role since auth is disabled
    this.appointmentService.getCurrentUserAppointments().subscribe({
      next: res => this.handleInitGetSuccess(res),
      error: err => this.handleRequestFailure(err)
    })
  }

  private handleInitGetSuccess(res: HttpResponse<Appointments>) {
    this.appointments = (new Appointments(res.body)).getAppointments()
    this.refreshAppointments()
  }

  private handleRequestFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

  isEditable(appointment: Appointment) {
    return appointment.getStatus() == "SCHEDULED"
  }

  private refreshAppointments() {
    let navigateTo = this.paginator.pageIndex
    this.appointmentsData = new MatTableDataSource(this.appointments)
    this.appointmentsData.paginator = this.paginator    
    for(let i = 0; i < navigateTo; i++) {
      this.paginator.nextPage()
    }
  }

  openAppointmentNewDialog() {
    console.log('Opening appointment dialog...')
    const dialogRef = this.dialog.open(AppointmentCreateFormDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false
    })
    
    dialogRef.afterClosed().subscribe(appointment => {
        console.log('Dialog closed with result:', appointment)
        if(appointment != null) {
          this.appointments.push(appointment)
          this.refreshAppointments()
        }
    })
  }

  searchAppointments() {
    this.appointmentService.searchAppointments(this.searchForm.controls["pattern"].value).subscribe({
      next: res => this.handleInitGetSuccess(res),
      error: err => this.handleRequestFailure(err)
    })
  }

  closeAppointment(appointment: Appointment) {
    this.appointmentService.closeAppointment(appointment.getId()).subscribe({
      next: () => this.handleDeleteSuccess(appointment),
      error: err => this.handleRequestFailure(err)
    })
  }

  private handleDeleteSuccess(appointment: Appointment) {
    var newStatus = this.isAdmin ? "DONE" : "CANCELLED"
    appointment.setStatus(newStatus)
    this.refreshAppointments()
  }

}