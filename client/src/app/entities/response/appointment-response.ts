export class Appointment {
    public id: string;
    public appointmentTime: string;
    public status: string;

    constructor(init?: Partial<Appointment>) {
        Object.assign(this, init);
    }

    getId() {
        return this.id;
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