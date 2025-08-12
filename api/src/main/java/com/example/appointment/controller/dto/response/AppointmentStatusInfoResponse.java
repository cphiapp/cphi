package com.example.appointment.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record AppointmentStatusInfoResponse(String status, String lastModified, String comment) {

}
