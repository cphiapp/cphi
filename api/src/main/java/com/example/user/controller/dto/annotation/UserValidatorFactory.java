package com.example.user.controller.dto.annotation;

import com.example.common.db.DatabaseUserReader;
import com.example.common.exception.EntityNotFoundException;
import io.micronaut.context.annotation.Factory;
import io.micronaut.validation.validator.constraints.ConstraintValidator;
import jakarta.inject.Singleton;

@Factory
class UserValidatorFactory {

    private final DatabaseUserReader databaseUserReader;

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