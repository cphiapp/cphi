package com.example.appointment.services.db;

import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentRepository;
import jakarta.inject.Singleton;

@Singleton
public class DatabaseAppointmentWriter {

    private final AppointmentRepository appointmentRepository;

    public DatabaseAppointmentWriter(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment modifyAppointment(Appointment appointment) {
        return appointmentRepository.update(appointment);
    }

}
