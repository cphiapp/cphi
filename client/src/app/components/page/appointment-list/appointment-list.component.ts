import { Component, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { HttpResponse, HttpErrorResponse } from "@angular/common/http"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { Router } from "@angular/router"

import { Appointment } from "../../../entities/response/appointment-response"
import { AppointmentEditFormDialogComponent } from "../../element/appointment-edit-form/appointment-edit-form.component"
import { AppointmentCreateFormDialogComponent } from "../../element/appointment-create-form/appointment-create-form.component"
import { AppointmentService } from "../../../services/http/appointment.service"


@Component({
  selector: "app-project-list",
  templateUrl: "./appointment-list.component.html"
})
export class AppointmentListComponent {

  @ViewChild("paginator") private paginator: MatPaginator
  private columns = ["id", "date", "status", "modify", "comment", "actions"]

  private errorMessage: string
  private appointments : Appointment[]
  private appointmentsData: MatTableDataSource<Appointment>
  private filterForm: FormGroup

  constructor(private dialog: MatDialog,
              private appointmentService: AppointmentService) {
    this.errorMessage = ""
    this.appointments = []
    this.appointmentsData = new MatTableDataSource(this.appointments)

    this.appointmentService.getCurrentUserAppointments().subscribe({
      next: res => this.handleGetSuccess(res),
      error: err => this.handleGetFailure(err)
    })
    
    this.appointmentsData.paginator = this.paginator;
  }

  private handleGetSuccess(res: HttpResponse<Appointment[]>) {
    this.appointments = res.body.map(appointment => new Appointment(appointment))
    this.refreshAppointments()
  }

  private handleGetFailure(err: HttpErrorResponse) {
    switch(err.status) {
      case 0:
        this.errorMessage = "Could not reach server."
        break
      default:
        this.errorMessage = "Failed to process request."
        break
    }
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getColumns() {
    return this.columns
  }

  getAppointmentsData() {
    return this.appointmentsData
  }

  getFilterForm() {
    return this.filterForm
  }

  refreshAppointments() {
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
          console.log(appointment)
          this.appointments.push(appointment)
          this.refreshAppointments()
        }
    })
  }

  openAppointmentEditDialog(appointment: Appointment) {
    this.dialog.open(AppointmentEditFormDialogComponent, {data: {"appointment": appointment}})
      .updateSize("30%")
      .afterClosed().subscribe(appointmentStatus => {
        if(appointmentStatus != null) {
          appointment.setAppointmentStatusInfo(appointmentStatus)
        }
      })
  }

}