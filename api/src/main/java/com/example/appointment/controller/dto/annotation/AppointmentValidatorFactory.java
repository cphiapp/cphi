package com.example.appointment.controller.dto.annotation;

import com.example.appointment.AppointmentStatus;
import io.micronaut.context.annotation.Factory;
import io.micronaut.validation.validator.constraints.ConstraintValidator;
import jakarta.inject.Singleton;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Locale;

@Factory
class AppointmentValidatorFactory {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("uuuu-MM-dd", Locale.US)
            .withResolverStyle(ResolverStyle.STRICT);

    @Singleton
    ConstraintValidator<ValidAppointmentStatus, String> appointmentStatusValidator() {
        return (value, annotationMetadata, context) -> AppointmentStatus.isValidAppointmentStatus(value);
    }

    @Singleton
    ConstraintValidator<ValidTimeStampFormat, String> timestampFormatValidator() {
        return (value, annotationMetadata, context) -> value == null || validateTimeFormat(value);
    }

    private boolean validateTimeFormat(String time) {
        try {
            DATE_TIME_FORMATTER.parse(time);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}