package com.example.appointment.controller.services;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.services.converter.CreateAppointmentRequestToAppointmentConverter;
import com.example.appointment.services.db.DatabaseAppointmentWriter;
import com.example.common.db.DatabaseAppointmentReader;

import jakarta.inject.Singleton;
import java.util.List;

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

    public Appointment createAppointment(CreateAppointmentRequest request) {
        // Use fixed test user since authentication is disabled
        String userName = "test-user";
        var appointment = createAppointmentConverter.convert(userName, request);
        return databaseAppointmentWriter.createAppointment(appointment);
    }

    public List<Appointment> getAppointments() {
        return databaseAppointmentReader.getAppointmentsOfUser("test-user");
    }
}
