package com.example.appointment.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.annotation.JsonValue;
import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record GetAppointmentsResponse(List<GetAppointmentResponse> appointments /*, int page, int totalCount*/) {
}
