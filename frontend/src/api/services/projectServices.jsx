import api from "../axios";

export const getUserProjects = (id, search = "", limit = "") => {
    return api.get(`/project/user/${id}`, {
        params: { 
            search, 
            limit 
        }
    });
};

export const getAssignedProjects = (id, search = "", aLimit = "") => {
    return api.get(`/project/assigned/${id}`, {
        params: { 
            search, 
            aLimit 
        }
    });
};

export const createProject = (projectData) => {
    return api.post("/project", projectData);
};