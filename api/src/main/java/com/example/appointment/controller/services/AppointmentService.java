package com.example.appointment.controller.services;

import static com.example.appointment.AppointmentStatus.CANCELLED;
import static com.example.appointment.AppointmentStatus.DONE;


import com.example.appointment.AppointmentStatus;
import com.example.appointment.dao.Appointment;
import com.example.appointment.services.converter.AppointmentStatusConverter;
import com.example.appointment.services.db.DatabaseAppointmentWriter;
import com.example.common.db.DatabaseAppointmentReader;

import jakarta.inject.Singleton;
import java.util.List;

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

    public List<Appointment> getAppointmentsWithPattern(String appointmentId) {
        return databaseAppointmentReader.getAppointmentsWithIdPrefix(appointmentId);
    }

    public Appointment cancelAppointment(String appointmentId) {
        var originalAppointment = databaseAppointmentReader.getAppointmentById(appointmentId);
        var newStatus = CANCELLED; // Always use CANCELLED since no admin roles
        var modifiedAppointment = converter.convert(originalAppointment, newStatus);
        return databaseAppointmentWriter.modifyAppointment(modifiedAppointment);
    }
}
