package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentStatusInfo;
import com.example.common.util.DateService;
import com.example.common.util.IdGeneratorService;
import jakarta.inject.Singleton;

import static com.example.appointment.AppointmentStatus.SCHEDULED;

@Singleton
public class CreateAppointmentRequestToAppointmentConverter {

    private final IdGeneratorService idGeneratorService;

    public CreateAppointmentRequestToAppointmentConverter(IdGeneratorService idGeneratorService) {
        this.idGeneratorService = idGeneratorService;
    }

    public Appointment convert(String userId, CreateAppointmentRequest request) {
        var id = idGeneratorService.generateId();
        var appointment = new Appointment();
        appointment.setAppointmentId(id);
        appointment.setUserId(userId);
        appointment.setAppointmentTime(appointment.getAppointmentTime());
        appointment.setAppointmentStatus(SCHEDULED.toString());
        return appointment;
        //return new Appointment(id, userId, request.appointmentTime(), createDefaultStatusInfo());
    }

    private AppointmentStatusInfo createDefaultStatusInfo() {
        return new AppointmentStatusInfo(SCHEDULED.toString(), null, null);
    }
}
