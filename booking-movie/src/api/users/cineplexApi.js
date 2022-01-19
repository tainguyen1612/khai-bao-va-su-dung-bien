import axiosClient from "./axiosClient";

const userCineplexApi = {
    getAll: () => {
        const url = "/cineplexs";
        return axiosClient.get(url);
    },
};

export default userCineplexApi;
