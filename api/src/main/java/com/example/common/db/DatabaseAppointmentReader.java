package com.example.common.db;

import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentRepository;
import com.example.common.exception.EntityNotFoundException;
import io.micronaut.context.annotation.Value;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import jakarta.inject.Singleton;
import java.util.List;

@Singleton
public class DatabaseAppointmentReader {

    private final AppointmentRepository appointmentRepository;
    private final Integer fetchCount;

    public DatabaseAppointmentReader(AppointmentRepository appointmentRepository,
                                     @Value("${pagination.default-count}") int fetchCount) {
        this.appointmentRepository = appointmentRepository;
        this.fetchCount = fetchCount;
    }

    public Appointment getAppointmentById(String appointmentId) {
        return appointmentRepository.findById(appointmentId).orElseThrow(() -> new EntityNotFoundException("Appointment " + appointmentId + " is not found."));
    }

    public List<Appointment> getAppointmentsOfUser(String userId, int page) {
        return appointmentRepository.findAllByUserId(userId);
        //return appointmentRepository.findAllByUserId(userId, Pageable.from(page, fetchCount));
    }
}
