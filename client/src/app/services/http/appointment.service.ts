import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, mergeMap } from "rxjs"

import { Endpoints } from "./http-config"
import { Appointment } from "../../entities/response/appointment-response"
import { CreateAppointmentRequest } from "../../entities/request/create-appointment-request"
import { AuthTokenService } from "../auth/auth-token.service"


@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  constructor(private http: HttpClient,
              private authTokenService: AuthTokenService) { }

  createAppointment(createAppointmentRequest: CreateAppointmentRequest): Observable<HttpResponse<Appointment>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.post<Appointment>(Endpoints.appointmentMapping, createAppointmentRequest, headers))
    )
  }

  getCurrentUserAppointments(): Observable<HttpResponse<Appointment[]>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.get<Appointment[]>(Endpoints.appointmentMapping, headers))
    )    
   
  }

  closeAppointment(appointmentId: string): Observable<HttpResponse<any>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.delete(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers))
    )    
  }

  searchAppointments(appointmentId: string): Observable<HttpResponse<Appointment[]>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.get<Appointment[]>(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers))
    )
  }
}
