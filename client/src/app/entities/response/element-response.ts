export class Element {

    private elementId: string
    private elementName: string
    private projectId: string
    private content: string
    private elementType: string

    constructor(init?: Element) {
        Object.assign(this, init)
    }

    getElementId() {
        return this.elementId
    }

    getElementName() {
        return this.elementName
    }

    getProjectId() {
        return this.projectId
    }

    setElementName(elementName: string) {
        this.elementName = elementName
    }

    getContent() {
        return this.content
    }

    setContent(content: string) {
        this.content = content
    }

    getElementType() {
        return this.elementType
    }

    getTypeAsExtension() {
        switch (this.elementType) {
            case "TYPE_WEBPAGE":
                return ".html"
            case "TYPE_OTHER":
                return ".txt"
            case "TYPE_MACRO":
                return ".txt"
            case "TYPE_SCRIPT":
                return ".js"
            case "TYPE_STYLESHEET":
                return ".css"
            default:
                return ".txt"
        }
    }

    getTypeAsReadableString() {
        return this.elementType.charAt(this.elementType.indexOf("_")+1) + this.elementType.slice(this.elementType.indexOf("_")+2).toLowerCase()
    }

}