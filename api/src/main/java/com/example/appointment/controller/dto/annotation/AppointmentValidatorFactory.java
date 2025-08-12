package com.example.appointment.controller.dto.annotation;

import static java.time.ZoneOffset.UTC;

import com.example.appointment.AppointmentStatus;
import com.example.common.util.DateService;
import io.micronaut.context.annotation.Factory;
import io.micronaut.validation.validator.constraints.ConstraintValidator;
import jakarta.inject.Singleton;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Date;
import java.util.Locale;

@Factory
class AppointmentValidatorFactory {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd")
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
            DATE_TIME_FORMATTER.parse(time);
            return LocalDate.parse(time).isAfter(dateService.getNow());
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}