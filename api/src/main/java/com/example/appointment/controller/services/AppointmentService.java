package com.example.appointment.controller.services;

import com.example.appointment.AppointmentStatus;
import com.example.appointment.dao.Appointment;
import com.example.appointment.services.converter.AppointmentStatusConverter;
import com.example.appointment.services.db.DatabaseAppointmentWriter;
import com.example.common.db.DatabaseAppointmentReader;
import io.micronaut.security.authentication.Authentication;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentService {

    private final DatabaseAppointmentReader databaseAppointmentReader;
    private final DatabaseAppointmentWriter databaseAppointmentWriter;
    private final AppointmentStatusConverter converter;

    public AppointmentService(DatabaseAppointmentReader databaseAppointmentReader,
            DatabaseAppointmentWriter databaseAppointmentWriter,
            AppointmentStatusConverter converter) {
        this.databaseAppointmentReader = databaseAppointmentReader;
        this.databaseAppointmentWriter = databaseAppointmentWriter;
        this.converter = converter;
    }

    public Appointment cancelAppointment(Authentication authentication, String appointmentId) {
        var originalAppointment = databaseAppointmentReader.getAppointmentById(appointmentId);
        var newStatus = (boolean) authentication.getAttributes().get(null) ? AppointmentStatus.CANCELLED : AppointmentStatus.DONE;
        var modifiedAppointment = converter.convert(originalAppointment, newStatus);
        return databaseAppointmentWriter.modifyAppointment(modifiedAppointment);
    }
}
