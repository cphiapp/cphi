import {HttpHeaders} from "@angular/common/http";

export const Endpoints = {
  userMapping: "api/v1/user",
  userEntityMapping: "api/v1/user/%1",
  appointmentMapping: "api/v1/appointment",
  appointmentEntityMapping: "api/v1/appointment/%1",
  projectMapping: "api/v1/project",
  projectEntityMapping: "api/v1/project/%1",
};

export const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
  observe: 'response' as const
};