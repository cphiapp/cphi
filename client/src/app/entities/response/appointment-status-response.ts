export class AppointmentStatus {
    public status: string
    public lastModified: string
    public comment: string

    constructor(init?: Partial<AppointmentStatus>) {
        Object.assign(this, init);
    }

    getStatus() {
        return this.status;
    }

    getLastModified() {
        return this.lastModified;
    }

    getComment() {
        return this.comment
    }
}