package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.ModifyAppointmentResponse;
import com.example.appointment.dao.Appointment;
import jakarta.inject.Singleton;

@Singleton
public class AppointmentToModifyAppointmentResponseConverter {

    private final AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter;

    public AppointmentToModifyAppointmentResponseConverter(AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter) {
        this.converter = converter;
    }

    public ModifyAppointmentResponse convert(Appointment appointment) {
<<<<<<< HEAD
        var appointmentStatusInfo = new AppointmentStatusInfoResponse(appointment.getAppointmentStatus(), appointment.getStatusLastModified(),
                appointment.getStatusChangeComment());
        return new ModifyAppointmentResponse(appointmentStatusInfo);
        //return new ModifyAppointmentResponse(converter.convert(appointment.statusInfo()));
=======
        return new ModifyAppointmentResponse(converter.convert(appointment.statusInfo()));
>>>>>>> f67e42c (MongoDb implementation)
    }
}
