export class Appointment {
    public id: string;
    public appointmentTime: string;
    public statusInfo: { status: string };

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
        return this.statusInfo.status;
    }
}