export class ModifyAppointmentRequest {
    public status: string;
    public comment: string;

    constructor(init?: Partial<ModifyAppointmentRequest>) {
        Object.assign(this, init);
    }
}