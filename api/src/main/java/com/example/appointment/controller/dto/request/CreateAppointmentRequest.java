package com.example.appointment.controller.dto.request;

import com.example.appointment.controller.dto.annotation.ValidTimeStampFormat;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record CreateAppointmentRequest(@ValidTimeStampFormat String appointmentTime) {
}
