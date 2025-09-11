import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

import { Endpoints } from "./http-config"
import { Appointment } from "../../entities/response/appointment-response"
import { CreateAppointmentRequest } from "../../entities/request/create-appointment-request"
// Authentication service removed
import { Appointments } from "../../entities/response/appointments-response"


@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  createAppointment(createAppointmentRequest: CreateAppointmentRequest): Observable<HttpResponse<any>> {
    console.log('AppointmentService: Creating appointment request')
    console.log('Endpoint URL:', Endpoints.appointmentMapping)
    console.log('Request payload:', createAppointmentRequest)
    
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response' as const
    }
    
    console.log('AppointmentService: Making HTTP POST request without auth')
    return this.http.post<any>(Endpoints.appointmentMapping, createAppointmentRequest, headers)
  }

  getCurrentUserAppointments(): Observable<HttpResponse<Appointments>> {
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response' as const
    }
    return this.http.get<Appointments>(Endpoints.appointmentMapping, headers)
  }

  closeAppointment(appointmentId: string): Observable<HttpResponse<any>> {
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response' as const
    }
    return this.http.delete(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers)
  }

  searchAppointments(appointmentId: string): Observable<HttpResponse<Appointments>> {
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response' as const
    }
    return this.http.get<Appointments>(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers)
  }
}
