package com.example.appointment.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record GetAppointmentResponse(String id, String appointmentTime, AppointmentStatusInfoResponse statusInfo) {

}