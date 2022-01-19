import userShowtimeApi from "../../api/users/showtimeApi";
import adminShowtimeApi from "../../api/admin/showtimeApi";

export const getShowtimeDetailAction = (id, history) => async (dispatch) => {
    try {
        const response = await userShowtimeApi.getById(id);
        if (!response.error) {
            dispatch({
                type: "GET_SHOWTIME_DETAIL_SUCCESS",
                payload: response,
            });
        } else {
            history.push("/movies/now-showing");
        }
    } catch (error) {
        dispatch({
            type: "GET_SHOWTIME_DETAIL_FAIL",
            payload: error.message,
        });
    }
};

export const getShowtimeSeatsAction = (id) => async (dispatch) => {
    try {
        const response = await userShowtimeApi.getSeats(id);
        console.log(response);
        if (!response.error) {
            dispatch({
                type: "GET_SEATS_SUCCESS",
                payload: response.seats,
            });
        }
    } catch (error) {
        dispatch({
            type: "GET_SEATS_FAIL",
            payload: error.message,
        });
    }
};

export const getAllShowtimesByCineplexAction = (id) => async (dispatch) => {
    try {
        const response = await userShowtimeApi.getByCineplexId(id);
        console.log(response);
        dispatch({
            type: "GET_ALL_SHOWTIMES_BY_CINEPLEX_SUCCESS",
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: "GET_ALL_SHOWTIMES_BY_CINEPLEX_FAIL",
            payload: error.message,
        });
    }
};

export const changeDayShowtimeAction = (obj) => async (dispatch, getState) => {
    const result = getState().showtime.showtimes.find(
        (s) => s.date === obj.value
    );
    dispatch({
        type: "RESET_MOVIES",
    });
    dispatch({
        type: "CHANGE_DAY_SHOWTIME",
        payload: result.movies,
    });
};

// admin

export const getAllShowtimesByMovieId = (data) => async (dispatch) => {
    try {
        const response = await adminShowtimeApi.getShowtimesByMovieId(data);
        console.log(response);
        dispatch({
            type: "GET_ALL_SHOWTIMES_SUCCESS",
            payload: response.showtimes,
        });
    } catch (error) {
        dispatch({
            type: "GET_ALL_SHOWTIMES_FAIL",
            payload: error.message,
        });
    }
};

export const createShowtime = (data) => async (dispatch) => {
    try {
        await adminShowtimeApi.create(data);
        dispatch({
            type: "CREATE_SHOWTIME_SUCCESS",
        });

        const response = await adminShowtimeApi.getShowtimesByMovieId({
            movie_id: data.movie_id,
        });
        dispatch({
            type: "GET_ALL_SHOWTIMES_SUCCESS",
            payload: response.showtimes,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_SHOWTIME_FAIL",
            payload: error.message,
        });
    }
};

export const updateShowtime = (data, id) => async (dispatch) => {
    try {
        await adminShowtimeApi.update(data, id);
        dispatch({
            type: "UPDATE_SHOWTIME_SUCCESS",
        });

        const response = await adminShowtimeApi.getShowtimesByMovieId({
            movie_id: data.movie_id,
        });
        dispatch({
            type: "GET_ALL_SHOWTIMES_SUCCESS",
            payload: response.showtimes,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_SHOWTIME_FAIL",
            payload: error.message,
        });
    }
};

export const removeShowtime = (id) => async (dispatch) => {
    try {
        await adminShowtimeApi.delete(id);
        dispatch({
            type: "DELETE_SHOWTIME_SUCCESS",
            payload: { showtimeId: id },
        });
    } catch (error) {
        dispatch({
            type: "DELETE_SHOWTIME_FAIL",
            payload: error.message,
        });
    }
};
