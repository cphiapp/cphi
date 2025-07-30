export class ModifyPasswordRequest {

    private oldPassword: string
    private newPassword: string

    constructor(init?: ModifyPasswordRequest) {
        Object.assign(this, init)
    }

}