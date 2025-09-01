import { Appointment } from "./appointment-response";

export class Appointments {
    public appointments: Appointment[]

    constructor(init?: Partial<Appointments>) {
        this.appointments = init.appointments?.map(appointment => new Appointment(appointment))
    }

    getAppointments() {
        return this.appointments;
    }
}