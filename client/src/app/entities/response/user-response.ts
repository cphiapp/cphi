export class User {

    public userId: string
    public userName: string
    public displayName: string

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

    setDisplayName(displayName: string) {
        this.displayName = displayName
    }
}