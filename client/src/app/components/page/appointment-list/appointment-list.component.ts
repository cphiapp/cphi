import { Component, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { HttpResponse, HttpErrorResponse } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"

import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentCreateFormDialogComponent } from "../../element/appointment-create-form/appointment-create-form.component"
import { AppointmentService } from "../../../services/http/appointment.service"
import { CognitoAuthService } from "../../../services/auth/auth.service"


@Component({
  selector: "app-project-list",
  templateUrl: "./appointment-list.component.html"
})
export class AppointmentListComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  columns = ["id", "date", "status", "actions"]
  errorMessage: string
  appointments : Appointment[]
  appointmentsData: MatTableDataSource<Appointment>
  searchForm: FormGroup
  isAdmin: boolean

  constructor(private authService: CognitoAuthService,
              private dialog: MatDialog,
              private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {
    this.isAdmin = false
    this.errorMessage = ""
    this.appointments = []
    this.appointmentsData = new MatTableDataSource(this.appointments)
    this.searchForm = this.formBuilder.nonNullable.group({
      pattern: ["", Validators.minLength(4)]
    })

    this.authService.authResult$.subscribe(result => console.log(result))

    this.authService.getParsedToken().subscribe(
      res => {
        this.isAdmin = res["cognito:groups"]?.includes("admin") || false
        if(this.isAdmin) {
          this.appointmentService.getCurrentUserAppointments().subscribe({
            next: res => this.handleInitGetSuccess(res),
            error: err => this.handleRequestFailure(err)
          })        
        }
      }
    )
  }

  private handleInitGetSuccess(res: HttpResponse<Appointment[]>) {
    this.appointments = res.body.map(appointment => new Appointment(appointment))
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
    this.dialog.open(AppointmentCreateFormDialogComponent)
      .updateSize("30%")
      .afterClosed().subscribe(appointment => {
        if(appointment != null) {
          this.appointments.push(appointment)
          this.refreshAppointments()
        }
    })
  }

  searchAppointments() {
    this.appointmentService.searchAppointments(this.searchForm.controls["pattern"].value.toUpperCase()).subscribe({
      next: res => this.handleInitGetSuccess(res),
      error: err => this.handleRequestFailure(err)
    })
  }

  closeAppointment(appointment: Appointment) {
    this.appointmentService.closeAppointment(appointment.getAppointmentId()).subscribe({
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