import api from "../axios";

export const getAllUserTasks = (id) => {
    return api.get(`/task/userTasks/${id}`);
}
