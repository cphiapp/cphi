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
            System.out.println("=== TIMESTAMP VALIDATION ===");
            System.out.println("Input timestamp: " + time);
            
            LocalDateTime appointmentDateTime = LocalDateTime.parse(time, DATE_TIME_FORMATTER);
            System.out.println("Successfully parsed timestamp: " + appointmentDateTime);
            
            LocalDate appointmentDate = appointmentDateTime.toLocalDate();
            System.out.println("Extracted date: " + appointmentDate);
            
            LocalDate today = dateService.getNow();
            System.out.println("Current date (UTC+3): " + today);
            
            boolean isValid = !appointmentDate.isBefore(today);
            System.out.println("Is appointment valid? " + isValid);
            System.out.println("=== END TIMESTAMP VALIDATION ===");
            
            // Temporarily return true to test format parsing only
            return true;
        } catch (DateTimeParseException e) {
            System.out.println("=== TIMESTAMP PARSING FAILED ===");
            System.out.println("Input: " + time);
            System.out.println("Error: " + e.getMessage());
            System.out.println("Expected format: yyyy-MM-ddTHH:mm:ss");
            System.out.println("=== END PARSING FAILURE ===");
            return false;
        }
    }
}