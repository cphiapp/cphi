package com.example.appointment.dao;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record AppointmentStatusInfo(String status, String lastModified, String comment) {

}
