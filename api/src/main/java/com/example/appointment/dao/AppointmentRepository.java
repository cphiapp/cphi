package com.example.appointment.dao;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.model.Slice;
//import io.micronaut.data.mongodb.annotation.MongoRepository;
import io.micronaut.data.repository.PageableRepository;
import java.util.List;

//@MongoRepository
@Repository
public interface AppointmentRepository extends PageableRepository<Appointment, String> {

    //Page<Appointment> findAllByUserId(String userId, Pageable page);
    List<Appointment> findAllByUserId(String userId);
}
