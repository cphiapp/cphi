package com.example.appointment.dao;

<<<<<<< HEAD
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
=======
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.validation.constraints.NotBlank;
>>>>>>> f67e42c (MongoDb implementation)

@MappedEntity
public record Appointment(@Id String id,
                          @NotBlank String userId,
                          @NotBlank String appointmentTime,
                          AppointmentStatusInfo statusInfo) {

}