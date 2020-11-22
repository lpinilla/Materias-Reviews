import http from "./httpService";

export function getSomething(something) {
    return http.post(`/api/${something}`);
}