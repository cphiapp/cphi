package com.example.common.util;

import static java.time.ZoneOffset.UTC;

import jakarta.inject.Singleton;
import java.time.OffsetDateTime;

@Singleton
public class DateService {

    public String getNow() {
        return OffsetDateTime.now(UTC).toString();
    }
}
