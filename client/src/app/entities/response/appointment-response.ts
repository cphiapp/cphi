

export class Appointment {
    public appointmentId: string;
    public appointmentTime: string;
    public status: string;

    constructor(init?: Partial<Appointment>) {
        Object.assign(this, init);
    }

    getAppointmentId() {
        return this.appointmentId;
    }

    getAppointmentTime() {
        return this.appointmentTime;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: string) {
        this.status = status
    }
}