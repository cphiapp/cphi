export class CreateAppointmentRequest {
    public appointmentTime: string;

    constructor(init?: Partial<CreateAppointmentRequest>) {
        Object.assign(this, init);
    }
}