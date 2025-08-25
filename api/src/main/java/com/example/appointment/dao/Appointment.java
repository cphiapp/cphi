package com.example.appointment.dao;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import jakarta.validation.constraints.NotBlank;

@MappedEntity
public record Appointment(@Id String id,
                          @NotBlank String userId,
                          @NotBlank String appointmentTime,
                          @NotBlank String appointmentStatus) {

}