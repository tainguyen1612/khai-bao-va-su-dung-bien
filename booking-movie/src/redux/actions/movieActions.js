import userMovieApi from "../../api/users/movieApi";
import adminMovieApi from "../../api/admin/movieApi";
import toast from "react-hot-toast";

export const getAllMoviesByStateAction = (state) => async (dispatch) => {
    try {
        const response = await userMovieApi.getByState(state);

        dispatch({
            type: "GET_MOVIES_SUCCESS",
            payload: response.movies,
        });
    } catch (error) {
        dispatch({
            type: "GET_MOVIES_FAIL",
            payload: error.message,
        });
    }
};

export const getMovieBySlugAction = (slug, history) => async (dispatch) => {
    try {
        const response = await userMovieApi.getBySlug(slug);

        if (!response.error) {
            dispatch({
                type: "GET_MOVIE_DETAIL_SUCCESS",
                payload: response,
            });
        } else {
            dispatch({
                type: "GET_MOVIE_DETAIL_FAIL",
                payload: response.error,
            });
            history.push("/movies/now-showing");
        }
    } catch (error) {
        dispatch({
            type: "GET_MOVIE_DETAIL_FAIL",
            payload: error.message,
        });
    }
};

export const getMovieShowtimesAction = (id, day) => async (dispatch) => {
    try {
        const response = await userMovieApi.getShowtimes(id, day);

        dispatch({
            type: "GET_MOVIE_SHOWTIMES_SUCCESS",
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: "GET_MOVIE_SHOWTIMES_FAIL",
            payload: error.message,
        });
    }
};

export const getCommentByUser = (id) => async (dispatch) => {
    try {
        const response = await userMovieApi.getComment(id);

        if (!response.error) {
            dispatch({
                type: "GET_COMMENT_MOVIE",
                payload: response,
            });
        } else {
            dispatch({
                type: "GET_COMMENT_MOVIE_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        toast.error(error);
    }
};

export const addCommentByUser = (data, id) => async (dispatch) => {
    try {
        await userMovieApi.addComment(data);
        dispatch({
            type: "CREATE_COMMENT_SUCCESS",
        });

        const response = await userMovieApi.getComment(id);
        dispatch({
            type: "GET_COMMENT_MOVIE",
            payload: response,
        });
    } catch (error) {
        toast.error(error);
    }
};

// admin

export const getAllMovies = () => async (dispatch) => {
    try {
        const response = await adminMovieApi.getAll();
        dispatch({
            type: "GET_ADMIN_MOVIES_SUCCESS",
            payload: response.movies,
        });
    } catch (error) {
        dispatch({
            type: "GET_ADMIN_MOVIES_FAIL",
            payload: error.message,
        });
    }
};

export const createMovie = (data) => async (dispatch) => {
    try {
        await adminMovieApi.create(data);
        dispatch({
            type: "CREATE_MOVIE_SUCCESS",
        });

        const response = await adminMovieApi.getAll();
        dispatch({
            type: "GET_ADMIN_MOVIES_SUCCESS",
            payload: response.movies,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_MOVIE_FAIL",
            payload: error.message,
        });
    }
};

export const updateMovie = (data, id) => async (dispatch) => {
    try {
        await adminMovieApi.update(data, id);
        dispatch({
            type: "UPDATE_MOVIE_SUCCESS",
        });

        const response = await adminMovieApi.getAll();
        dispatch({
            type: "GET_ADMIN_MOVIES_SUCCESS",
            payload: response.movies,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_MOVIE_FAIL",
            payload: error.message,
        });
    }
};

export const removeMovie = (id) => async (dispatch) => {
    try {
        await adminMovieApi.delete(id);
        dispatch({
            type: "DELETE_MOVIE_SUCCESS",
            payload: { movieId: id },
        });
    } catch (error) {
        dispatch({
            type: "DELETE_MOVIE_FAIL",
            payload: error.message,
        });
    }
};
