import toast from "react-hot-toast";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    email: "",
    password: "",
    accessToken: localStorage.getItem("accessToken"),
    isVerified: false,
    isVerifyCodeResetPassword: false,
    isReset: false,
    isLogined: false,
    isAdmin: false,
    isUser: false,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "REGISTER_SUCCESS": {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...payload, isUser: true })
            );

            return {
                ...state,
                user: payload,
                isLogined: true,
                isUser: true,
            };
        }
        case "REGISTER_FAIL": {
            toast.error("Dữ liệu không hợp lệ!");
            toast.error(payload);
            return {
                ...state,
            };
        }

        case "CHANGE_PASSWORD_SUCCESS": {
            toast.success("Đổi mật khẩu thành công!");
            return {
                ...state,
            };
        }
        case "CHANGE_PASSWORD_FAIL": {
            toast.error("Mật khẩu hiện tại không đúng!");
            return {
                ...state,
            };
        }

        case "LOGIN_SUCCESS": {
            localStorage.setItem("accessToken", payload.accessToken);
            localStorage.setItem(
                "user",
                JSON.stringify({ ...payload.user, isUser: true })
            );
            return {
                ...state,
                user: payload.user,
                accessToken: payload.accessToken,
                isLogined: true,
                isUser: true,
            };
        }

        case "LOGIN_FAIL": {
            toast.error("Tài khoản không hợp lệ");
            toast.error(payload);
            return {
                ...state,
                error: payload,
            };
        }
        case "GET_USER_INFO_SUCCESS": {
            return {
                ...state,
                user: payload.user,
            };
        }
        case "GET_USER_INFO_FAIL": {
            toast.error(payload);
            return {
                ...state,
            };
        }
        case "UPDATE_PROFILE_SUCCESS": {
            toast.success("Cập nhật thành công!");
            localStorage.setItem(
                "user",
                JSON.stringify({ ...payload.user, isUser: true })
            );
            return {
                ...state,
                user: payload.user,
            };
        }
        case "UPDATE_PROFILE_FAIL": {
            toast.error(payload);
            toast.error("Cập nhật thất bại!");
            return {
                ...state,
            };
        }
        case "LOGOUT": {
            localStorage.clear();
            return {
                ...state,
                user: null,
                accessToken: null,
                isLogined: false,
                isAdmin: false,
                isUser: false,
            };
        }
        // admin
        case "LOGIN_ADMIN_SUCCESS": {
            localStorage.setItem(
                "user",
                JSON.stringify({ ...payload, isAdmin: true })
            );
            return {
                ...state,
                user: payload,
                isAdmin: true,
            };
        }

        case "GET_USER_SUCCESS": {
            return {
                ...state,
                lstUser: payload,
            };
        }
        case "GET_USER_FAIL": {
            toast.error(payload.error);
            return {
                ...state,
                lstUser: [],
            };
        }
        default:
            return state;
    }
};

export default authReducer;
