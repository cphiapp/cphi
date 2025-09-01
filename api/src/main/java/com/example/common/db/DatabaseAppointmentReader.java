package com.example.common.db;

import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentRepository;
import com.example.common.exception.EntityNotFoundException;
import io.micronaut.security.authentication.Authentication;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class DatabaseAppointmentReader {

    private final AppointmentRepository appointmentRepository;

    public DatabaseAppointmentReader(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment getAppointmentById(String appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment " + appointmentId + " is not found."));
    }

    public List<Appointment> getAppointmentsOfUser(Authentication authentication) {
        return appointmentRepository.findAllByUserId(authentication.getName());
    }

    public List<Appointment> getAppointmentsWithIdPrefix(String id) {
        return appointmentRepository.findAllByIdLike(id.toLowerCase());
    }
}
