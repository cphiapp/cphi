package com.example.appointment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ModifyAppointmentResponse(@JsonUnwrapped AppointmentStatusInfoResponse statusInfo) {

}
