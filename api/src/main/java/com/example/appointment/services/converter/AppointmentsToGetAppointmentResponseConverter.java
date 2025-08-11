package com.example.appointment.services.converter;

import com.example.appointment.controller.dto.response.GetAppointmentResponse;
import com.example.appointment.controller.dto.response.GetAppointmentsResponse;
import com.example.appointment.dao.Appointment;
<<<<<<< HEAD
import jakarta.inject.Singleton;
import java.util.List;
=======
import io.micronaut.data.model.Page;
import jakarta.inject.Singleton;
>>>>>>> f67e42c (MongoDb implementation)

@Singleton
public class AppointmentsToGetAppointmentResponseConverter {

    private final AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter;

    public AppointmentsToGetAppointmentResponseConverter(AppointmentStatusInfoToAppointmentStatusInfoResponseConverter converter) {
        this.converter = converter;
    }

<<<<<<< HEAD
    public GetAppointmentsResponse convert(List<Appointment> appointments) {
        return new GetAppointmentsResponse(appointments.stream().map(this::convertSingle).toList()/*, -1, -1*/);
        //return new GetAppointmentsResponse(appointments.getContent().stream().map(this::convertSingle).toList(), Long.valueOf(appointments.getTotalSize()).intValue(), appointments.getNumberOfElements());
    }

    private GetAppointmentResponse convertSingle(Appointment appointment) {
        var appointmentStatusInfo = new AppointmentStatusInfoResponse(appointment.getAppointmentStatus(), appointment.getStatusLastModified(),
                appointment.getStatusChangeComment());
        return new GetAppointmentResponse(appointment.getAppointmentId(), appointment.getAppointmentTime(), appointmentStatusInfo);
        //return new GetAppointmentResponse(appointment.id(), appointment.appointmentTime(), converter.convert(appointment.statusInfo()));
=======
    public GetAppointmentsResponse convert(Page<Appointment> appointments) {
        return new GetAppointmentsResponse(appointments.getContent().stream().map(this::convertSingle).toList(),
                Long.valueOf(appointments.getTotalSize()).intValue(), appointments.getNumberOfElements());
    }

    private GetAppointmentResponse convertSingle(Appointment appointment) {
        return new GetAppointmentResponse(appointment.id(), appointment.appointmentTime(), converter.convert(appointment.statusInfo()));
>>>>>>> f67e42c (MongoDb implementation)
    }


}
