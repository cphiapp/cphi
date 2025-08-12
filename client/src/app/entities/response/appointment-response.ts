import { AppointmentStatus } from "./appointment-status-response";

export class Appointment {
    public appointmentId: string;
    public appointmentTime: string;
    public statusInfo: AppointmentStatus;

    constructor(init?: Partial<Appointment>) {
        Object.assign(this, init);
        this.statusInfo = new AppointmentStatus(this.statusInfo)
    }

    getAppointmentId() {
        return this.appointmentId;
    }

    getAppointmentTime() {
        return this.appointmentTime;
    }

    getAppointmentStatusInfo() {
        return this.statusInfo;
    }

    setAppointmentStatusInfo(statusInfo: AppointmentStatus) {
        this.statusInfo = statusInfo
    }
}