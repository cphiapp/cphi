package com.example.appointment.services.converter;

import static com.example.appointment.AppointmentStatus.SCHEDULED;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.dao.Appointment;
import com.example.appointment.dao.AppointmentStatusInfo;
import com.example.common.util.IdGeneratorService;
import jakarta.inject.Singleton;

@Singleton
public class CreateAppointmentRequestToAppointmentConverter {

    private final IdGeneratorService idGeneratorService;

    public CreateAppointmentRequestToAppointmentConverter(IdGeneratorService idGeneratorService) {
        this.idGeneratorService = idGeneratorService;
    }

    public Appointment convert(String userId, CreateAppointmentRequest request) {
        var id = idGeneratorService.generateId();
<<<<<<<HEAD
        var appointment = new Appointment();
        appointment.setAppointmentId(id);
        appointment.setUserId(userId);
        appointment.setAppointmentTime(request.appointmentTime());
        appointment.setAppointmentStatus(SCHEDULED.toString());
        return appointment;
        //return new Appointment(id, userId, request.appointmentTime(), createDefaultStatusInfo());
=======
        return new Appointment(id, userId, request.appointmentTime(), createDefaultStatusInfo());
>>>>>>>f67e42c(MongoDb implementation)
    }

    private AppointmentStatusInfo createDefaultStatusInfo() {
        return new AppointmentStatusInfo(SCHEDULED.toString(), null, null);
    }
}
