package com.example.common.exception;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ErrorResponse(String errorMessage) {

}
