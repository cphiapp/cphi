package com.example.appointment.controller;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.controller.dto.response.CreateAppointmentResponse;
import com.example.appointment.controller.dto.response.GetAppointmentsResponse;
import com.example.appointment.controller.services.AppointmentsService;
import com.example.appointment.services.converter.AppointmentToCreateAppointmentResponseConverter;
import com.example.appointment.services.converter.AppointmentsToGetAppointmentsResponseConverter;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;

@Controller("/api/v1/appointments")
public class AppointmentsController {

    private final AppointmentsService appointmentsService;
    private final AppointmentToCreateAppointmentResponseConverter createAppointmentConverter;
    private final AppointmentsToGetAppointmentsResponseConverter getAppointmentsConverter;

    public AppointmentsController(AppointmentsService appointmentsService,
            AppointmentToCreateAppointmentResponseConverter createAppointmentConverter,
            AppointmentsToGetAppointmentsResponseConverter getAppointmentsConverter) {
        this.appointmentsService = appointmentsService;
        this.createAppointmentConverter = createAppointmentConverter;
        this.getAppointmentsConverter = getAppointmentsConverter;
    }

    @Post
    public CreateAppointmentResponse createAppointment(@Body @Valid CreateAppointmentRequest request) {
        var appointment = appointmentsService.createAppointment(request);
        return createAppointmentConverter.convert(appointment);
    }

    @Get
    public GetAppointmentsResponse getAppointments() {
        var appointments = appointmentsService.getAppointments();
        return getAppointmentsConverter.convert(appointments);
    }
}
