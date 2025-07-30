package com.example.appointment.controller.dto.response;

import java.util.List;

public record GetAppointmentsResponse(List<GetAppointmentResponse> appointments, int page, int totalCount) {
}
