package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.AppointmentStatusInfoResponse;
import com.example.appointment.dao.AppointmentStatusInfo;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentStatusInfoToAppointmentStatusInfoResponseConverter {

    public AppointmentStatusInfoResponse convert(AppointmentStatusInfo statusInfo) {
        return new AppointmentStatusInfoResponse(statusInfo.status(), statusInfo.lastModified(), statusInfo.lastModified());
    }
}
