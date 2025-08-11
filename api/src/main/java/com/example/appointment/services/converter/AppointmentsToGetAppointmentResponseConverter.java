package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.GetAppointmentResponse;
import com.example.appointment.controller.dto.response.GetAppointmentsResponse;
import com.example.appointment.dao.Appointment;
import io.micronaut.data.model.Page;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentsToGetAppointmentResponseConverter {

    private final AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter;

    public AppointmentsToGetAppointmentResponseConverter(AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter) {
        this.converter = converter;
    }

    public GetAppointmentsResponse convert(Page<Appointment> appointments) {
        return new GetAppointmentsResponse(appointments.getContent().stream().map(this::convertSingle).toList(),
                Long.valueOf(appointments.getTotalSize()).intValue(), appointments.getNumberOfElements());
    }

    private GetAppointmentResponse convertSingle(Appointment appointment) {
        return new GetAppointmentResponse(appointment.id(), appointment.appointmentTime(), converter.convert(appointment.statusInfo()));
    }


}
