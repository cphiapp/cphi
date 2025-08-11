package com.example.appointment.dao;

import com.example.appointment.controller.dto.annotation.ValidAppointmentStatus;
import com.example.appointment.controller.dto.annotation.ValidTimeStampFormat;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record AppointmentStatusInfo(@ValidAppointmentStatus String status, @ValidTimeStampFormat String lastModified,
                                    String comment) {

}
