export class ModifyProjectRequest {

    public projectName: string

    constructor(init?: ModifyProjectRequest) {
        Object.assign(this, init)
    }

    getProjectName() {
        return this.projectName
    }

}