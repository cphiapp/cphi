package com.example.appointment.controller.dto.request;

import com.example.appointment.controller.dto.annotation.ValidAppointmentStatus;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.annotation.Nullable;

@Serdeable
public record ModifyAppointmentRequest(@ValidAppointmentStatus String status, @Nullable String comment) {

}
