package com.example.user.dto.annotation;

import com.example.appointment.AppointmentStatus;
import com.example.appointment.controller.dto.annotation.ValidTimeStampFormat;
import com.example.common.db.DatabaseUserReader;
import com.example.common.exception.EntityNotFoundException;
import io.micronaut.context.annotation.Factory;
import io.micronaut.validation.validator.constraints.ConstraintValidator;
import jakarta.inject.Singleton;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Locale;

@Factory
class UserValidatorFactory {

    private DatabaseUserReader databaseUserReader;

    public UserValidatorFactory(DatabaseUserReader databaseUserReader) {
        this.databaseUserReader = databaseUserReader;
    }

    @Singleton
    ConstraintValidator<UniqueUserName, String> uniqueUserNameValidator() {
        return (value, annotationMetadata, context) -> {
            try {
                databaseUserReader.getUserByUserName(value);
            } catch (EntityNotFoundException e) {
                return true;
            }
            return false;
        };
    }

}