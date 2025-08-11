package com.example.appointment.dao;

<<<<<<< HEAD
import io.micronaut.data.annotation.Repository;
=======
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.mongodb.annotation.MongoRepository;
>>>>>>> f67e42c (MongoDb implementation)
import io.micronaut.data.repository.PageableRepository;
import java.util.List;

@MongoRepository
public interface AppointmentRepository extends PageableRepository<Appointment, String> {

    //Page<Appointment> findAllByUserId(String userId, Pageable page);
    List<Appointment> findAllByUserId(String userId);
    List<Appointment> findAllByIdIlike(String id);
}
