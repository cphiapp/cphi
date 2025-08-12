package com.example.appointment.controller;

import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import com.example.appointment.controller.dto.request.ModifyAppointmentRequest;
import com.example.appointment.controller.dto.response.ModifyAppointmentResponse;
import com.example.appointment.controller.services.AppointmentService;
import com.example.appointment.services.converter.AppointmentToModifyAppointmentResponseConverter;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Put;
import io.micronaut.security.annotation.Secured;
import jakarta.validation.Valid;

@Controller("/api/v1/appointments/{appointmentId}")
@Secured(IS_AUTHENTICATED)
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentToModifyAppointmentResponseConverter converter;

    public AppointmentController(AppointmentService appointmentService,
            AppointmentToModifyAppointmentResponseConverter converter) {
        this.appointmentService = appointmentService;
        this.converter = converter;
    }

    @Put
    public ModifyAppointmentResponse modifyAppointment(@PathVariable String appointmentId, @Body @Valid ModifyAppointmentRequest request) {
        var appointment = appointmentService.modifyAppointment(appointmentId, request);
        return converter.convert(appointment);
    }
}
