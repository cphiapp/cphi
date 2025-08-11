package com.example.appointment.controller.dto.response;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record GetAppointmentsResponse(List<GetAppointmentResponse> appointments, int page, int totalCount) {

}
