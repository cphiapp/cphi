package com.example.appointment.dao;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
<<<<<<< HEAD
public record AppointmentStatusInfo(String status, String lastModified, String comment) {
=======
public record AppointmentStatusInfo(@ValidAppointmentStatus String status, @ValidTimeStampFormat String lastModified,
                                    String comment) {
>>>>>>> f67e42c (MongoDb implementation)

}
