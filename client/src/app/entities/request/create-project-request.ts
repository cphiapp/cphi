export class CreateProjectRequest {

    public projectName: string

    constructor(init?: CreateProjectRequest) {
        Object.assign(this, init)
    }

}