import api from "../axios";

export const getUserProjects = (id) => {
    return api.get(`/project/user/${id}`);
}

export const getAssignedProjects = (id) => {
    return api.get(`/project/assigned/${id}`);
}
