package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.AppointmentStatusInfoResponse;
import com.example.appointment.controller.dto.response.CreateAppointmentResponse;
import com.example.appointment.dao.Appointment;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentToCreateAppointmentResponseConverter {

    private final AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter;

    public AppointmentToCreateAppointmentResponseConverter(AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter) {
        this.converter = converter;
    }

    public CreateAppointmentResponse convert(Appointment appointment) {
        var appointmentStatusInfo = new AppointmentStatusInfoResponse(appointment.getAppointmentStatus(), appointment.getStatusLastModified(),
                appointment.getStatusChangeComment());
        return new CreateAppointmentResponse(appointment.getAppointmentId(), appointment.getAppointmentTime(), appointmentStatusInfo);
        //return new CreateAppointmentResponse(appointment.id(), appointment.appointmentTime(), converter.convert(appointment.statusInfo()));
    }


}
