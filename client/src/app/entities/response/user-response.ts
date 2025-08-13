export class User {

    public userId: string
    public userName: string
    public displayName: string
    public roleName: string

    constructor(init: Partial<User>) {
        Object.assign(this, init)
    }

    getUserId() {
        return this.userId
    }

    getUserName() {
        return this.userName
    }

    getDisplayName() {
        return this.displayName
    }

    getRoleName() {
        return this.roleName
    }
}