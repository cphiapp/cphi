package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.request.ModifyAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentStatusInfo;
import com.example.common.util.DateService;
import jakarta.inject.Singleton;


@Singleton
public class ModifyAppointmentRequestToAppointmentConverter {

    private final DateService dateService;

    public ModifyAppointmentRequestToAppointmentConverter(DateService dateService) {
        this.dateService = dateService;
    }

    public Appointment convert(Appointment appointment, ModifyAppointmentRequest request) {
        appointment.setAppointmentStatus(request.status());
        appointment.setStatusLastModified(dateService.getNow().toString());
        appointment.setStatusChangeComment(request.comment());
        return appointment;
        //return new Appointment(appointment.id(), appointment.userId(), appointment.appointmentTime(), convertStatusInfo(request));
    }

    private AppointmentStatusInfo convertStatusInfo(ModifyAppointmentRequest request) {
        return new AppointmentStatusInfo(request.status(), dateService.getNow().toString(), request.comment());
    }
}
