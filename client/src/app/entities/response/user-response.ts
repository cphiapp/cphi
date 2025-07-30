export class User {

    private userId: string
    private userName: string
    private displayName: string

    constructor(init: User) {
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