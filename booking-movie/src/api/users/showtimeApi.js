import axiosClient from "./axiosClient";

const userShowtimeApi = {
    getById: (id) => {
        const url = `/showtimes/${id}`;
        return axiosClient.get(url);
    },

    getByCineplexId: (data) => {
        const url = `/showtimes/cineplexs`;
        return axiosClient.post(url, data);
    },

    getSeats: (id) => {
        const url = `/showtimes/${id}/seats`;
        return axiosClient.get(url);
    },
};

export default userShowtimeApi;
