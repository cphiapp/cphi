export class ModifyElementRequest {

    private content: string

    constructor(init?: ModifyElementRequest) {
        Object.assign(this, init)
    }

    getContent() {
        return this.content
    }

}