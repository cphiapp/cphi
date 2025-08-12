package com.example.appointment.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;


/*public record GetAppointmentResponse(String appointmentId, String appointmentTime, AppointmentStatusInfoResponse statusInfo) {
}*/

@Serdeable
public record GetAppointmentResponse(String appointmentId, String appointmentTime, AppointmentStatusInfoResponse statusInfo) {

}