import axiosClient from "./axiosClient";
import { subURL } from "../configApi";

const userMovieApi = {
    getAll: () => {
        const url = "/movies";
        return axiosClient.get(url);
    },

    getByState: (params) => {
        const url = "/movies";
        return axiosClient.get(url, { params });
    },

    getBySlug: (slug) => {
        const url = `/movies/detail/${slug}`;
        return axiosClient.get(url);
    },

    getShowtimes: (id, params) => {
        const url = `/movies/${id}/showtimes`;
        return axiosClient.get(url, { params });
    },

    getComment: (id) => {
        const url = `${subURL}/comment?slug=${id}`;
        return axiosClient.get(url);
    },

    addComment: (data) => {
        const url = `${subURL}/comment`;
        return axiosClient.post(url, { ...data });
    },
};

export default userMovieApi;
