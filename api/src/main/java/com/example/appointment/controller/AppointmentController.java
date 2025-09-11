package com.example.appointment.controller;

import static io.micronaut.http.HttpResponse.ok;

import com.example.appointment.controller.dto.response.GetAppointmentsResponse;
import com.example.appointment.controller.services.AppointmentService;
import com.example.appointment.services.converter.AppointmentsToGetAppointmentsResponseConverter;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;

@Controller("/api/v1/appointments/{appointmentId}")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentsToGetAppointmentsResponseConverter converter;

    public AppointmentController(AppointmentService appointmentService,
            AppointmentsToGetAppointmentsResponseConverter converter) {
        this.appointmentService = appointmentService;
        this.converter = converter;
    }

    @Get
    public GetAppointmentsResponse getAppointmentsWithPattern(@PathVariable String appointmentId) {
        var appointments = appointmentService.getAppointmentsWithPattern(appointmentId);
        return converter.convert(appointments);
    }

    @Delete
    public HttpResponse<?> closeAppointment(@PathVariable String appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
        return ok();
    }
}
