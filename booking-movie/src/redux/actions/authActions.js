import userAuthApi from "../../api/users/authApi";
import adminAuthApi from "../../api/admin/authApi";
import toast from "react-hot-toast";

export const setAccessToken = (token) => ({
    type: "ACCESS_TOKEN",
    payload: token,
});

export const loginAction = (data) => async (dispatch) => {
    try {
        const response = await userAuthApi.login(data);
        if (response.user) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response,
            });
        } else {
            dispatch({
                type: "LOGIN_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: error.message,
        });
    }
};

export const getUserInfoAction = () => async (dispatch, getState) => {
    try {
        let { accessToken } = getState().auth;
        const response = await userAuthApi.getUserInfo(accessToken);
        if (!response.error) {
            dispatch({
                type: "GET_USER_INFO_SUCCESS",
                payload: response,
            });
        } else {
            dispatch({
                type: "GET_USER_INFO_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "GET_USER_INFO_FAIL",
            payload: error.message,
        });
    }
};

export const updateProfileAction = (data) => async (dispatch, getState) => {
    try {
        let { accessToken } = getState().auth;
        await userAuthApi.updateUserInfo(data, accessToken);
        const response = await userAuthApi.getUserInfo(accessToken);
        if (!response.error) {
            dispatch({
                type: "UPDATE_PROFILE_SUCCESS",
                payload: response,
            });
        } else {
            dispatch({
                type: "UPDATE_PROFILE_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "UPDATE_PROFILE_FAIL",
            payload: error.message,
        });
    }
};

export const registerAction = (data) => async (dispatch) => {
    try {
        const response = await userAuthApi.register(data);
        if (!response.error) {
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: data,
            });
        } else {
            dispatch({
                type: "REGISTER_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: error.message,
        });
    }
};

export const changePasswordAction =
    (data, history) => async (dispatch, getState) => {
        try {
            let { accessToken } = getState().auth;
            const response = await userAuthApi.changePassword(
                data,
                accessToken
            );
            if (!response.error) {
                dispatch({
                    type: "CHANGE_PASSWORD_SUCCESS",
                });
                history.push("/");
            } else {
                dispatch({
                    type: "CHANGE_PASSWORD_FAIL",
                    payload: response.error,
                });
            }
        } catch (error) {
            dispatch({
                type: "CHANGE_PASSWORD_FAIL",
                payload: error.message,
            });
        }
    };

export const logoutAction = () => async (dispatch) => {
    dispatch({
        type: "LOGOUT",
    });
};

// admin

export const login = (data, history) => async (dispatch) => {
    try {
        const response = await adminAuthApi.login(data);

        if (response.admin) {
            dispatch({
                type: "LOGIN_ADMIN_SUCCESS",
                payload: response.admin,
            });
            history.push("/dashboard");
        } else {
            dispatch({
                type: "LOGIN_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "LOGIN_FAIL",
            payload: error.message,
        });
    }
};

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await adminAuthApi.getUser();

        dispatch({
            type: "GET_USER_SUCCESS",
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: "GET_USER_FAIL",
            payload: error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: "LOGOUT",
    });
};
