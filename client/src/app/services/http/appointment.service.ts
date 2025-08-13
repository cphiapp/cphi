import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { Endpoints, HttpOptions } from "./http-config"
import { Appointment } from "../../entities/response/appointment-response"
import { CreateAppointmentRequest } from "../../entities/request/create-appointment-request"
import { ModifyAppointmentRequest } from "../../entities/request/modify-appointment-request"
import { AppointmentStatus } from "../../entities/response/appointment-status-response"


@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  createAppointment(createAppointmentRequest: CreateAppointmentRequest): Observable<HttpResponse<Appointment>> {
    return this.http.post<Appointment>(Endpoints.appointmentMapping, createAppointmentRequest, HttpOptions)
  }

  getCurrentUserAppointments(): Observable<HttpResponse<Appointment[]>> {
    return this.http.get<Appointment[]>(Endpoints.appointmentMapping, HttpOptions)
  }

  modifyAppointment(appointmentId: string, modifyAppointmentRequest: ModifyAppointmentRequest): Observable<HttpResponse<AppointmentStatus>> {
    return this.http.put<AppointmentStatus>(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), modifyAppointmentRequest, HttpOptions)
  }

  searchAppointments(appointmentId: string): Observable<HttpResponse<Appointment[]>> {
    return this.http.get<Appointment[]>(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), HttpOptions)
  }
}
