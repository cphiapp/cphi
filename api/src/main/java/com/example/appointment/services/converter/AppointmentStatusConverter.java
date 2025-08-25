package com.example.appointment.services.converter;

import com.example.appointment.AppointmentStatus;
import com.example.appointment.dao.Appointment;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentStatusConverter {

    public Appointment convert(Appointment appointment, AppointmentStatus newStatus) {
        return new Appointment(appointment.id(), appointment.userId(), appointment.appointmentTime(), newStatus.name());
    }

}
