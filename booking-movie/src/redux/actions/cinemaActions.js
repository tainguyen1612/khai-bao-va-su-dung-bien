import adminCinemaApi from "../../api/admin/cinemaApi";

export const getAllCinemas = () => async (dispatch) => {
    try {
        const response = await adminCinemaApi.getAll();
        dispatch({
            type: "GET_CINEMAS_SUCCESS",
            payload: response.cinemas,
        });
    } catch (error) {
        dispatch({
            type: "GET_CINEMAS_FAIL",
            payload: error.message,
        });
    }
};

export const getCinemaTypes = () => async (dispatch) => {
    try {
        const response = await adminCinemaApi.getTypes();
        dispatch({
            type: "GET_CINEMAS_TYPES_SUCCESS",
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: "GET_CINEMAS_TYPES_FAIL",
            payload: error.message,
        });
    }
};

export const createCinema = (data) => async (dispatch) => {
    try {
        await adminCinemaApi.create(data);
        dispatch({
            type: "CREATE_CINEMA_SUCCESS",
        });

        const response = await adminCinemaApi.getAll();
        dispatch({
            type: "GET_CINEMAS_SUCCESS",
            payload: response.cinemas,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_CINEMA_FAIL",
            payload: error.message,
        });
    }
};

export const updateCinema = (data, id) => async (dispatch) => {
    try {
        await adminCinemaApi.update(data, id);
        dispatch({
            type: "UPDATE_CINEMA_SUCCESS",
        });

        const response = await adminCinemaApi.getAll();
        dispatch({
            type: "GET_CINEMAS_SUCCESS",
            payload: response.cinemas,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_CINEMA_FAIL",
            payload: error.message,
        });
    }
};

export const removeCinema = (id) => async (dispatch) => {
    try {
        await adminCinemaApi.delete(id);
        dispatch({
            type: "DELETE_CINEMA_SUCCESS",
            payload: { cinemaId: id },
        });
    } catch (error) {
        dispatch({
            type: "DELETE_CINEMA_FAIL",
            payload: error.message,
        });
    }
};
