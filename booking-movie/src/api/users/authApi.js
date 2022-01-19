import axiosClient from "./axiosClient";

const userAuthApi = {
    login: (data) => {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    },

    register: (data) => {
        const url = "/auth/register";
        return axiosClient.post(url, data);
    },

    changePassword: (data, token) => {
        const url = "/auth/changePassword";
        return axiosClient.post(url, data, {
            headers: { Authorization: "Bearer " + token },
        });
    },

    getUserInfo: (token) => {
        const url = "/user/profile";
        return axiosClient.get(url, {
            headers: { Authorization: "Bearer " + token },
        });
    },

    updateUserInfo: (formData, token) => {
        const url = "/user/profile";
        return axiosClient.put(url, formData, {
            headers: { Authorization: "Bearer " + token },
        });
    },
};

export default userAuthApi;
