package com.example.appointment.controller.dto.annotation;

import com.example.appointment.AppointmentStatus;
import com.example.common.util.DateService;
import io.micronaut.context.annotation.Factory;
import io.micronaut.validation.validator.constraints.ConstraintValidator;
import jakarta.inject.Singleton;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;

@Factory
class AppointmentValidatorFactory {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
            .withResolverStyle(ResolverStyle.STRICT);

    private final DateService dateService;

    public AppointmentValidatorFactory(DateService dateService) {
        this.dateService = dateService;
    }

    @Singleton
    ConstraintValidator<ValidAppointmentStatus, String> appointmentStatusValidator() {
        return (value, annotationMetadata, context) -> AppointmentStatus.isValidAppointmentStatus(value);
    }

    @Singleton
    ConstraintValidator<ValidTimeStamp, String> timestampFormatValidator() {
        return (value, annotationMetadata, context) -> value == null || validateTimeFormat(value);
    }

    private boolean validateTimeFormat(String time) {
        try {
            LocalDateTime appointmentDateTime = LocalDateTime.parse(time, DATE_TIME_FORMATTER);
            return appointmentDateTime.toLocalDate().isAfter(dateService.getNow());
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}