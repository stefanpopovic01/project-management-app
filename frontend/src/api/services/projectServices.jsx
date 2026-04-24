import api from "../axios";

export const getUserProjects = (id, search = "") => {
    return api.get(`/project/user/${id}?search=${search}`);
};
export const getAssignedProjects = (id, search = "") => {
    return api.get(`/project/assigned/${id}?search=${search}`);
};
