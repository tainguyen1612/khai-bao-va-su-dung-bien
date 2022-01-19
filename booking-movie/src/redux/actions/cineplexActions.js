import userCineplexApi from "../../api/users/cineplexApi";
import adminCineplexApi from "../../api/admin/cineplexApi";

export const getAllCineplexsAction = () => async (dispatch) => {
    try {
        const response = await userCineplexApi.getAll();
        if (!response.error) {
            dispatch({
                type: "GET_CINEPLEXS_SUCCESS",
                payload: response.cineplexs,
            });
        } else {
            dispatch({
                type: "GET_CINEPLEXS_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "GET_CINEPLEXS_FAIL",
            payload: error.message,
        });
    }
};

export const getCineplexItemAction = (id) => async (dispatch, getState) => {
    const cineplexs = getState().cineplex.data;
    const item = cineplexs.find((c) => c.id === id);
    dispatch({
        type: "GET_CINEPLEX_ITEM",
        payload: item,
    });
};

// admin
export const getAllCineplexs = () => async (dispatch) => {
    try {
        const response = await adminCineplexApi.getAll();
        dispatch({
            type: "GET_CINEPLEX_SUCCESS",
            payload: response.cineplexs,
        });
    } catch (error) {
        dispatch({
            type: "GET_CINEPLEX_FAIL",
            payload: error.message,
        });
    }
};

export const createCineplex = (data) => async (dispatch) => {
    try {
        await adminCineplexApi.create(data);
        dispatch({
            type: "CREATE_CINEPLEX_SUCCESS",
        });

        const response = await adminCineplexApi.getAll();
        dispatch({
            type: "GET_CINEPLEX_SUCCESS",
            payload: response.cineplexs,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_CINEPLEX_FAIL",
            payload: error.message,
        });
    }
};

export const updateCineplex = (data, id) => async (dispatch) => {
    try {
        await adminCineplexApi.update(data, id);
        dispatch({
            type: "UPDATE_CINEPLEX_SUCCESS",
        });

        const response = await adminCineplexApi.getAll();
        dispatch({
            type: "GET_CINEPLEX_SUCCESS",
            payload: response.cineplexs,
        });
    } catch (error) {
        dispatch({
            type: "UPDATE_CINEPLEX_FAIL",
            payload: error.message,
        });
    }
};

export const removeCineplex = (id) => async (dispatch) => {
    try {
        await adminCineplexApi.delete(id);
        dispatch({
            type: "DELETE_CINEPLEX_SUCCESS",
            payload: { cineplexId: id },
        });
    } catch (error) {
        dispatch({
            type: "DELETE_CINEPLEX_FAIL",
            payload: error.message,
        });
    }
};
