package com.example.appointment.dao;

import com.example.appointment.controller.dto.annotation.ValidAppointmentStatus;
import com.example.appointment.controller.dto.annotation.ValidTimeStamp;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record AppointmentStatusInfo(String status, String lastModified, String comment) {

}
