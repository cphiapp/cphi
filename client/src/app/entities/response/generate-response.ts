export class GenerateResponse {

    private content: string

    constructor(init?: GenerateResponse) {
        Object.assign(this, init)
    }

    getContent() {
        return this.content
    }

}