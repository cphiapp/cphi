export class RoleMapping {

    static getProjectEditRoles() {
        return ["ACCESS_OWNER"]
    }

    static getProjectDeleteRoles() {
        return ["ACCESS_OWNER"]
    }

    static getElementCreateRoles(elementType: string) {
        switch (elementType) {
            case "TYPE_WEBPAGE":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_WEB"]
            case "TYPE_OTHER":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_WEB", "ACCESS_SCRIPT", "ACCESS_MACRO", "ACCESS_STYLE", ]
            case "TYPE_MACRO":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_MACRO"]
            case "TYPE_SCRIPT":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_SCRIPT"]
            case "TYPE_STYLESHEET":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_STYLE"]
            default:
                return ["ACCESS_OWNER"]
        }
    }

    static getElementEditRoles(elementType: string) {
        switch (elementType) {
            case "TYPE_WEBPAGE":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_WEB"]
            case "TYPE_OTHER":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_WEB", "ACCESS_SCRIPT", "ACCESS_MACRO", "ACCESS_STYLE", "ACCESS_USER"]
            case "TYPE_MACRO":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_MACRO"]
            case "TYPE_SCRIPT":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_SCRIPT"]
            case "TYPE_STYLESHEET":
                return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_STYLE"]
            default:
                return ["ACCESS_OWNER"]
        }
    }

    static getElementDeleteRoles() {
        return ["ACCESS_OWNER", "ACCESS_ADMIN"]
    }

    static getElementGenerateRoles() {
        return ["ACCESS_OWNER", "ACCESS_ADMIN", "ACCESS_GENERATOR"]
    }

    static getAccessAddRoles() {
        return ["ACCESS_OWNER", "ACCESS_ADMIN"]
    }

    static getAccessEditRoles() {
        return ["ACCESS_OWNER", "ACCESS_ADMIN"]
    }

    static getAccessDeleteRoles() {
        return ["ACCESS_OWNER"]
    }

}