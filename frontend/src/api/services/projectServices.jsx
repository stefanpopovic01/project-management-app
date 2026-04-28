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

export const respondInvite = (projectId, action) => {
  return api.patch("/project/respond-invite", {
    projectId,
    action
  });
};

export const getProject = (id) => {
    return api.get(`/project/${id}`)
};