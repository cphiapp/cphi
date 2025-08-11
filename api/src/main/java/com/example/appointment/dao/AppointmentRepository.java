package com.example.appointment.dao;

import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.mongodb.annotation.MongoRepository;
import io.micronaut.data.repository.PageableRepository;

@MongoRepository
public interface AppointmentRepository extends PageableRepository<Appointment, String> {

    Page<Appointment> findAllByUserId(String userId, Pageable page);
}
