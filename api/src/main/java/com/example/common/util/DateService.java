package com.example.common.util;

import jakarta.inject.Singleton;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

import static java.time.ZoneOffset.UTC;

@Singleton
public class DateService {

    public String getNow() {
        return OffsetDateTime.now(UTC).toString();
    }
}
