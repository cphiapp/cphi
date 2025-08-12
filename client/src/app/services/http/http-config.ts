import {HttpHeaders} from "@angular/common/http";

export const HttpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
  observe: 'response' as const
};

let url = "http://localhost:8080"
export const Endpoints = {
  userMapping: url + "/api/v1/users",
  appointmentMapping: url + "/api/v1/appointments",
  appointmentEntityMapping: url + "/api/v1/appointments/%1"
};
