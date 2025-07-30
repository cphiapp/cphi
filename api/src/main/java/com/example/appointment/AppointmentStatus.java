package com.example.appointment;

import java.util.Arrays;

public enum AppointmentStatus {
    SCHEDULED,
    CANCELLED,
    DONE;

    public static boolean isValidAppointmentStatus(String status) {
        return Arrays.stream(values()).anyMatch(value -> value.toString().equals(status));
    }

}
