import http from "./httpService";

export function getHelloWorld() {
    return http.get(`/`);
}

//Materias
export function getAllCourses() {
    return http.get(`/all_courses`);
}
export function getCourseByID(code) {
    return http.get(`/course/${code}`);
}
export function getMyCourses(userID) {
    return http.get(`/current_user_courses/${userID}`);
}

//Reviews
// '/review/{codigo_materia}/general'
export function getAllReviews(subject) {
    return http.get(`/review/${subject}/general`);
}
export function getReview(subject) {
    return http.get(`/review/${subject}`);
}
export function getReviewScore(subject) {
    return http.get(`/review/${subject}/puntaje`);
}
export function getReviewComment(subject) {
    return http.get(`/review/${subject}/comentario`);
}
export function getMyReviews(userID) {
    return http.get(`/reviews/${userID}`);
}
export function addReview(payload) {
    return http.post(`/review/add_review`, payload);
}

//User
export function getUser(userID) {
    return http.get(`/users/${userID}`);
}
export function getFriends(userID) {
    return http.get(`/friends/${userID}`);
}
export function addFriend(userID,payload) {
    //Por ahi hay que cambiar userID a int
    return http.post(`/users/${userID}/friend_request`, payload);
}

// TODO: getUserRecomendedCourses
export function getUserRecomendedCourses(userID,min_score) {
    //Por ahi hay que cambiar userID a int
    return http.get(`/recommendations/${userID}/${min_score}`);
}