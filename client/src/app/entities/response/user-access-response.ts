export class UserAccess {

    private accessId: string
    private userId: string
    private userName: string
    private displayName: string
    private imageLink: string
    private accessTypes: string[]

    constructor(init?: UserAccess) {
        Object.assign(this, init)
    }

    getAccessId() {
        return this.accessId
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

    getImageLink() {
        return this.imageLink
    }

    getAccessTypes() {
        return this.accessTypes
    }

    getAccessTypesAsReadableString() {
        return this.accessTypes.map(accessType => accessType.charAt(accessType.indexOf("_")+1) + accessType.slice(accessType.indexOf("_")+2).toLowerCase()).join(", ")
    }

    setAccessTypes(accessTypes: string[]) {
        this.accessTypes = accessTypes
    }

}