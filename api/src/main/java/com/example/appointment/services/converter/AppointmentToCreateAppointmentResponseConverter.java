package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.CreateAppointmentResponse;
import com.example.appointment.dao.Appointment;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentToCreateAppointmentResponseConverter {

    public CreateAppointmentResponse convert(Appointment appointment) {
        return new CreateAppointmentResponse(appointment.id(), appointment.appointmentTime(), appointment.appointmentStatus());
    }


}
