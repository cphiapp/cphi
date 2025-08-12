package com.example.appointment.controller.dto.request;

import com.example.appointment.controller.dto.annotation.ValidTimeStamp;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record CreateAppointmentRequest(@ValidTimeStamp String appointmentTime) {

}
