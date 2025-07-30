import { HttpHeaders } from "@angular/common/http"

export const HttpOptions = ({
    headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }),
    observe: "response" as const
})

let url = "http://localhost:8080"
export const Endpoints = {
    userMapping: url + "/users",
    userEntityMapping: url + "/users/%1",
    projectMapping: url + "/projects",
    projectEntityMapping: url + "/projects/%1",
    elementMapping: url + "/projects/%1/elements",
    elementEntityMapping: url + "/projects/%1/elements/%2",
    accessMapping: url + "/projects/%1/access",
    accessEntityMapping: url + "/projects/%1/access/%2"
}