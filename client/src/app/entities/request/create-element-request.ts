export class CreateElementRequest {

    private elementName: string
    private content: string
    private elementType: string

    constructor(init?: CreateElementRequest) {
        Object.assign(this, init)
    }

}