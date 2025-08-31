package com.example.appointment.dao;

import io.micronaut.data.mongodb.annotation.MongoRepository;
import io.micronaut.data.repository.CrudRepository;
import java.util.List;

@MongoRepository
public interface AppointmentRepository extends CrudRepository<Appointment, String> {

    List<Appointment> findAllByUserId(String userId);

    List<Appointment> findAllByIdLike(String id);
}
