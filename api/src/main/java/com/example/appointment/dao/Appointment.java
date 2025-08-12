package com.example.appointment.dao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
@MappedEntity
public record Appointment(@Id String id,
                          @NotBlank String userId,
                          @NotBlank String appointmentTime,
                          AppointmentStatusInfo statusInfo) {

}
*/

//H2 temp implementation
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    String appointmentId;
    @Column
    String userId;
    @Column
    String appointmentTime;
    @Column
    String appointmentStatus;
    @Column
    String statusLastModified;
    @Column
    String statusChangeComment;

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(String appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }

    public String getStatusLastModified() {
        return statusLastModified;
    }

    public void setStatusLastModified(String statusLastModified) {
        this.statusLastModified = statusLastModified;
    }

    public String getStatusChangeComment() {
        return statusChangeComment;
    }

    public void setStatusChangeComment(String statusChangeComment) {
        this.statusChangeComment = statusChangeComment;
    }
}