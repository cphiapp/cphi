package com.example.common.exception;


public class EntityNotFoundException extends RuntimeException {

    private final String message;

    public EntityNotFoundException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
