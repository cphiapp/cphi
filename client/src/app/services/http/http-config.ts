import { environment } from '../../environments/environment';

// API Configuration - uses environment-specific URLs
let url = environment.apiUrl;
export const Endpoints = {
  userMapping: url + "/api/v1/users",
  appointmentMapping: url + "/api/v1/appointments",
  appointmentEntityMapping: url + "/api/v1/appointments/%1"
};
