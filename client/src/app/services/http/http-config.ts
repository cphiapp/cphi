import { environment } from '../../../environments/environment';

// API Configuration - uses environment-specific URLs
// Angular will automatically replace environment.ts with environment.prod.ts during production builds
let url = environment.apiUrl;
export const Endpoints = {
  userMapping: url + "/api/v1/users",
  appointmentMapping: url + "/api/v1/appointments",
  appointmentEntityMapping: url + "/api/v1/appointments/%1"
};
