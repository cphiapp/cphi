package com.example.appointment.controller;

import static io.micronaut.http.HttpResponse.ok;
import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import com.example.appointment.controller.services.AppointmentService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;

@Controller("/api/v1/appointments/{appointmentId}")
@Secured(IS_AUTHENTICATED)
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @Delete
    public HttpResponse<?> cancelAppointment(Authentication authentication, @PathVariable String appointmentId) {
        appointmentService.cancelAppointment(authentication, appointmentId);
        return ok();
    }
}
