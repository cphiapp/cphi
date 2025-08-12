package com.example.appointment.controller;

import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import com.example.appointment.controller.dto.request.CreateAppointmentRequest;
import com.example.appointment.controller.dto.response.CreateAppointmentResponse;
import com.example.appointment.controller.dto.response.GetAppointmentResponse;
import com.example.appointment.controller.services.AppointmentsService;
import com.example.appointment.services.converter.AppointmentToCreateAppointmentResponseConverter;
import com.example.appointment.services.converter.AppointmentsToGetAppointmentResponseConverter;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.security.annotation.Secured;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;

@Controller("/api/v1/appointments")
@Secured(IS_AUTHENTICATED)
public class AppointmentsController {

    private final AppointmentsService appointmentsService;
    private final AppointmentToCreateAppointmentResponseConverter createAppointmentConverter;
    private final AppointmentsToGetAppointmentResponseConverter getAppointmentsConverter;

    public AppointmentsController(AppointmentsService appointmentsService,
            AppointmentToCreateAppointmentResponseConverter createAppointmentConverter,
            AppointmentsToGetAppointmentResponseConverter getAppointmentsConverter) {
        this.appointmentsService = appointmentsService;
        this.createAppointmentConverter = createAppointmentConverter;
        this.getAppointmentsConverter = getAppointmentsConverter;
    }

    @Post
    public CreateAppointmentResponse createAppointment(Principal principal, @Body @Valid CreateAppointmentRequest request) {
        var appointment = appointmentsService.createAppointment(principal, request);
        return createAppointmentConverter.convert(appointment);
    }

    @Get
    public List<GetAppointmentResponse> getAppointments(Principal principal, @QueryValue(defaultValue = "0") int page) {
        var appointments = appointmentsService.getAppointments(principal, page);
        return getAppointmentsConverter.convert(appointments).appointments();
    }
}
