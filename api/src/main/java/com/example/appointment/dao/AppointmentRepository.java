package com.example.appointment.dao;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.PageableRepository;
import java.util.List;

//@MongoRepository
@Repository
public interface AppointmentRepository extends PageableRepository<Appointment, String> {

    //Page<Appointment> findAllByUserId(String userId, Pageable page);
    List<Appointment> findAllByUserId(String userId);
    List<Appointment> findAllByIdIlike(String id);
}
