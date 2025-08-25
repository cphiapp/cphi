package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.GetAppointmentResponse;
import com.example.appointment.controller.dto.response.GetAppointmentsResponse;
import com.example.appointment.dao.Appointment;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class AppointmentsToGetAppointmentsResponseConverter {

    public GetAppointmentsResponse convert(List<Appointment> appointments) {
        return new GetAppointmentsResponse(appointments.stream().map(this::convertSingle).toList());
    }

    private GetAppointmentResponse convertSingle(Appointment appointment) {
        return new GetAppointmentResponse(appointment.id(), appointment.appointmentTime(), appointment.appointmentStatus());
    }

}
