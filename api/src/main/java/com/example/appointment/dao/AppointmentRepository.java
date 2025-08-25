package com.example.appointment.dao;

import io.micronaut.data.mongodb.annotation.MongoRepository;
import io.micronaut.data.repository.PageableRepository;
import java.util.List;

@MongoRepository
public interface AppointmentRepository extends PageableRepository<Appointment, String> {

    List<Appointment> findAllByUserId(String userId);

    List<Appointment> findAllByIdIlike(String id);
}
