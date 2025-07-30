export class ModifyUserRequest {

    private displayName: string
    private imageLink: string

    constructor(init?: ModifyUserRequest) {
        Object.assign(this, init)
    }

}