import api from "../axios";

export const getNotifications = () => {
    return api.get(`/notification/`);
}
