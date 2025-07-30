package com.example.appointment.controller.services;

import com.example.appointment.controller.dto.request.ModifyAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.services.converter.ModifyAppointmentRequestToAppointmentConverter;
import com.example.common.db.DatabaseAppointmentReader;
import com.example.appointment.services.db.DatabaseAppointmentWriter;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentService {

    private final DatabaseAppointmentReader databaseAppointmentReader;
    private final DatabaseAppointmentWriter databaseAppointmentWriter;
    private final ModifyAppointmentRequestToAppointmentConverter converter;

    public AppointmentService(DatabaseAppointmentReader databaseAppointmentReader,
                              DatabaseAppointmentWriter databaseAppointmentWriter,
                              ModifyAppointmentRequestToAppointmentConverter converter) {
        this.databaseAppointmentReader = databaseAppointmentReader;
        this.databaseAppointmentWriter = databaseAppointmentWriter;
        this.converter = converter;
    }

    public Appointment modifyAppointment(String appointmentId, ModifyAppointmentRequest request) {
        var originalAppointment = databaseAppointmentReader.getAppointmentById(appointmentId);
        var modifiedAppointment = converter.convert(originalAppointment, request);
        return databaseAppointmentWriter.modifyAppointment(modifiedAppointment);
    }
}
