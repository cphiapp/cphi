export class CreateUserRequest {

    public userName: string
    public displayName: string
    public password: string

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