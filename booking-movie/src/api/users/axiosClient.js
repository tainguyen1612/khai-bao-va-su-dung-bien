import axios from "axios";
import queryString from "query-string";
import { mainURL } from "../configApi";

const axiosClient = axios.create({
    baseURL: mainURL,
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        return Promise.reject(error);
    }
);

export default axiosClient;
