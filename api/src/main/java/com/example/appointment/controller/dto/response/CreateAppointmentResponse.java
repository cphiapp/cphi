package com.example.appointment.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;


@Serdeable
public record CreateAppointmentResponse(String id, String appointmentTime, AppointmentStatusInfoResponse statusInfo) {
}
