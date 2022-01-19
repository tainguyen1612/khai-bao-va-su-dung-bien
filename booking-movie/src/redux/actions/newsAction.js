import toast from "react-hot-toast";
import userNewsApi from "../../api/users/newsApi";

export const getAllNews = () => async (dispatch) => {
    try {
        const response = await userNewsApi.getNewsAll();
        dispatch({
            type: "GET_NEWS_SUCCESS",
            payload: response,
        });
    } catch (error) {
        toast.error(error);
    }
};

export const getDetailNews = (id) => async (dispatch) => {
    try {
        const response = await userNewsApi.getNewsDetail(id);
        dispatch({
            type: "GET_DETAIL_NEWS",
            payload: response[0],
        });
    } catch (error) {
        toast.error(error);
    }
};
