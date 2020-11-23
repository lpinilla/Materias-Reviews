import http from "./httpService";

export function getSomething(something) {
    return http.get(`/api/${something}`);
}
export function getHelloWorld() {
    return http.get(`/`);
}