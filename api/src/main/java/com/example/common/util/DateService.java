package com.example.common.util;

import jakarta.inject.Singleton;
import java.time.LocalDate;
import java.time.ZoneOffset;

@Singleton
public class DateService {

    public LocalDate getNow() {
        return LocalDate.now(ZoneOffset.of("+3"));
    }
}
