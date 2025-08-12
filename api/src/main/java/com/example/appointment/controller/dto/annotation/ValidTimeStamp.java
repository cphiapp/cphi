package com.example.appointment.controller.dto.annotation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Retention(RUNTIME)
@Target({FIELD, PARAMETER})
@Documented
@Constraint(validatedBy = {})
public @interface ValidTimeStamp {

    String message() default "Invalid timestamp format ({validatedValue})";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
