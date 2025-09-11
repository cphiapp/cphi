import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, mergeMap } from "rxjs"

import { Endpoints } from "./http-config"
import { Appointment } from "../../entities/response/appointment-response"
import { CreateAppointmentRequest } from "../../entities/request/create-appointment-request"
import { AuthTokenService } from "../auth/auth-token.service"
import { Appointments } from "../../entities/response/appointments-response"


@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  constructor(private http: HttpClient,
              private authTokenService: AuthTokenService) { }

  createAppointment(createAppointmentRequest: CreateAppointmentRequest): Observable<HttpResponse<any>> {
    console.log('AppointmentService: Creating appointment request')
    console.log('Endpoint URL:', Endpoints.appointmentMapping)
    console.log('Request payload:', createAppointmentRequest)
    
    // Temporarily disable authentication for testing
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response' as const
    }
    
    console.log('AppointmentService: Making HTTP POST request without auth')
    return this.http.post<any>(Endpoints.appointmentMapping, createAppointmentRequest, headers)
    
    // Original code with auth (commented out for testing):
    // return this.authTokenService.getHeaders().pipe(
    //   mergeMap(headers => {
    //     console.log('AppointmentService: Headers obtained, making HTTP POST request')
    //     console.log('Headers:', headers)
    //     return this.http.post<any>(Endpoints.appointmentMapping, createAppointmentRequest, headers)
    //   })
    // )
  }

  getCurrentUserAppointments(): Observable<HttpResponse<Appointments>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.get<Appointments>(Endpoints.appointmentMapping, headers))
    )    
   
  }

  closeAppointment(appointmentId: string): Observable<HttpResponse<any>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.delete(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers))
    )    
  }

  searchAppointments(appointmentId: string): Observable<HttpResponse<Appointments>> {
    return this.authTokenService.getHeaders().pipe(
      mergeMap(headers => this.http.get<Appointments>(Endpoints.appointmentEntityMapping.replace("%1", appointmentId), headers))
    )
  }
}
