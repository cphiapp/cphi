export class CreateUserRequest {

    private userName: string
    private displayName: string
    private password: string

    constructor(init?: CreateUserRequest) {
        Object.assign(this, init)
    }

    getUserName() {
        return this.userName
    }

    getPassword() {
        return this.password
    }
}