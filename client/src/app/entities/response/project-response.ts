export class ProjectAccess {

    public projectId: string
    public projectName: string
    public accessTypes: string[]

    constructor(init?: Partial<ProjectAccess>) {
        Object.assign(this, init)
    }

    getProjectId() {
        return this.projectId
    }

    setProjectId(projectId: string) {
        this.projectId = projectId
    }

    getProjectName() {
        return this.projectName
    }

    setProjectName(projectName: string) {
        this.projectName = projectName
    }

    setMissingProjectName() {
        this.projectName = "Project"
    }

    getAccessTypes() {
        return this.accessTypes
    }

    setMissingProjectAccess() {
        this.accessTypes = []
    }

    getAccessTypesAsReadableString() {
        return this.accessTypes.map(accessType => accessType.charAt(accessType.indexOf("_")+1) + accessType.slice(accessType.indexOf("_")+2).toLowerCase()).join(", ")
    }

}