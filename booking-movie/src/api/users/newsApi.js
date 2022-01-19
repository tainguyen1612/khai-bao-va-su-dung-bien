import axiosClient from "./axiosClient";
import { subURL } from "../configApi";
const userNewsApi = {
    getNewsAll: () => {
        const url = `${subURL}/news`;
        return axiosClient.get(url);
    },

    getNewsDetail: (id) => {
        const url = `${subURL}/news?id=${id}`;
        return axiosClient.get(url);
    },
};

export default userNewsApi;
