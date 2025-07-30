package com.example.common.util;

import jakarta.inject.Singleton;

import java.util.UUID;


@Singleton
public class IdGeneratorService {

    public String generateId() {
        return UUID.randomUUID().toString();
    }
}
