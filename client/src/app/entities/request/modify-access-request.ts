export class ModifyAccessRequest {

    private accessTypes: string[]

    constructor(init?: ModifyAccessRequest) {
        Object.assign(this, init)
        if(!this.accessTypes.includes("ACCESS_USER")) {
            this.accessTypes.push("ACCESS_USER")
        }
    }

    getAccessTypes() {
        return this.accessTypes
    }

}