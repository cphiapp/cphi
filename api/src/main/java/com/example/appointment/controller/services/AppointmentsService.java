package com.example.appointment.controller.services;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.services.converter.CreateAppointmentRequestToAppointmentConverter;
import com.example.common.db.DatabaseAppointmentReader;
import com.example.appointment.services.db.DatabaseAppointmentWriter;
import io.micronaut.data.model.Page;
import jakarta.inject.Singleton;

import java.security.Principal;

@Singleton
public class AppointmentsService {

    private final DatabaseAppointmentReader databaseAppointmentReader;
    private final DatabaseAppointmentWriter databaseAppointmentWriter;
    private final CreateAppointmentRequestToAppointmentConverter createAppointmentConverter;

    public AppointmentsService(DatabaseAppointmentReader databaseAppointmentReader,
                               DatabaseAppointmentWriter databaseAppointmentWriter,
                               CreateAppointmentRequestToAppointmentConverter createAppointmentConverter) {
        this.databaseAppointmentReader = databaseAppointmentReader;
        this.databaseAppointmentWriter = databaseAppointmentWriter;
        this.createAppointmentConverter = createAppointmentConverter;
    }

    public Appointment createAppointment(Principal principal, CreateAppointmentRequest request) {
        var appointment = createAppointmentConverter.convert(principal.getName(), request);
        return databaseAppointmentWriter.createAppointment(appointment);
    }

    public Page<Appointment> getAppointments(Principal principal, int page) {
        return databaseAppointmentReader.getAppointmentsOfUser(principal.getName(), page);
    }
}
