package com.example.appointment.controller;

import static io.micronaut.security.rules.SecurityRule.IS_AUTHENTICATED;

import com.example.appointment.controller.dto.request.ModifyAppointmentRequest;
import com.example.appointment.controller.dto.response.GetAppointmentResponse;
import com.example.appointment.controller.dto.response.ModifyAppointmentResponse;
import com.example.appointment.controller.services.AppointmentService;
import com.example.appointment.services.converter.AppointmentToModifyAppointmentResponseConverter;
import com.example.appointment.services.converter.AppointmentsToGetAppointmentResponseConverter;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.security.annotation.Secured;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;

@Controller("/api/v1/appointments/{appointmentId}")
@Secured(IS_AUTHENTICATED)
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentToModifyAppointmentResponseConverter modifyAppointmentConverter;
    private final AppointmentsToGetAppointmentResponseConverter getAppointmentsConverter;

    public AppointmentController(AppointmentService appointmentService,
            AppointmentToModifyAppointmentResponseConverter modifyAppointmentConverter,
            AppointmentsToGetAppointmentResponseConverter getAppointmentsConverter) {
        this.appointmentService = appointmentService;
        this.modifyAppointmentConverter = modifyAppointmentConverter;
        this.getAppointmentsConverter = getAppointmentsConverter;
    }

    @Put
    public ModifyAppointmentResponse modifyAppointment(@PathVariable String appointmentId, @Body @Valid ModifyAppointmentRequest request) {
        var appointment = appointmentService.modifyAppointment(appointmentId, request);
        return modifyAppointmentConverter.convert(appointment);
    }

    @Get
    public List<GetAppointmentResponse> getAppointments(@PathVariable String appointmentId) {
        var appointments = appointmentService.getAppointments(appointmentId);
        return getAppointmentsConverter.convert(appointments).appointments();
    }
}
