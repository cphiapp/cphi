export class CreateAccessRequest {

    private userId: string

    constructor(init?: CreateAccessRequest) {
        Object.assign(this, init)
    }

    setUserId(userId: string) {
        this.userId = userId
    }

}