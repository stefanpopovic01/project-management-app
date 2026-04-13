import api from "../axios";

export const getUser = (id) => {
    return api.get(`/user/${id}`);
}

export const getFollowers = (id) => {
    return api.get(`/user/followers/${id}`);
}

export const getFollowing = (id) => {
    return api.get(`/user/following/${id}`);
}