package com.example.appointment.controller.dto.request;

import com.example.appointment.controller.dto.annotation.ValidTimeStampFormat;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record CreateAppointmentRequest(@ValidTimeStampFormat String appointmentTime) {

}
