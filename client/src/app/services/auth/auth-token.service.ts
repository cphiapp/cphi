import { Injectable } from "@angular/core"

import { Buffer } from "buffer"
import { HttpOptions } from "../http/http-config"


@Injectable({
    providedIn: "root"
})
export class AuthTokenService {

    setCredential(userName: string, password: string) {
        let token = Buffer.from(`${userName}:${password}`, "binary").toString("base64")
        HttpOptions.headers = HttpOptions.headers.set("Authorization", `Basic ${token}`)
    }

    unsetCredential() {
        HttpOptions.headers = HttpOptions.headers.delete("Authorization")
    }

}