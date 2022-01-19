import toast from "react-hot-toast";

const initialState = {
    data: {},
    array: [],
    showtimes: [],
    message: "",
    movies: [],
};

const showtimeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_SHOWTIME_DETAIL_SUCCESS": {
            return {
                ...state,
                data: payload,
            };
        }
        case "GET_SHOWTIME_DETAIL_FAIL": {
            return {
                ...state,
                data: {},
            };
        }
        case "REMOVE_SHOWTIME_DETAIL": {
            return {
                ...state,
                data: {},
            };
        }
        case "GET_ALL_SHOWTIMES_BY_CINEPLEX_SUCCESS": {
            return {
                ...state,
                showtimes: payload,
                message: payload.length === 0 ? "Không có lịch chiếu!" : "",
                movies: payload.length === 0 ? [] : payload[0].movies,
            };
        }
        case "GET_ALL_SHOWTIMES_BY_CINEPLEX_FAIL": {
            return {
                ...state,
                showtimes: [],
            };
        }
        case "RESET_MOVIES": {
            return {
                ...state,
                movies: [],
            };
        }
        case "CHANGE_DAY_SHOWTIME": {
            return {
                ...state,
                movies: payload,
            };
        }
        case "REMOVE_ALL_SHOWTIMES": {
            return {
                ...state,
                showtimes: [],
                movies: [],
                message: "",
            };
        }
        case "GET_SEATS_SUCCESS": {
            return {
                ...state,
                array: payload,
            };
        }
        case "GET_SEATS_FAIL": {
            return {
                ...state,
                array: [],
            };
        }
        case "REMOVE_SEATS": {
            return {
                ...state,
                array: [],
            };
        }

        // admin

        case "GET_ALL_SHOWTIMES_SUCCESS": {
            return {
                ...state,
                showtimes: payload,
            };
        }
        case "GET_ALL_SHOWTIMES_FAIL": {
            toast.error(payload);
            return {
                ...state,
                showtimes: [],
            };
        }
        case "REMOVE_ALL_SHOWTIMES": {
            return {
                ...state,
                showtimes: [],
            };
        }
        case "CREATE_SHOWTIME_SUCCESS": {
            toast.success("Tạo lịch chiếu thành công");
            return {
                ...state,
            };
        }
        case "CREATE_SHOWTIME_FAIL": {
            toast.error("Lỗi tạo lịch chiếu");
            return {
                ...state,
            };
        }
        case "UPDATE_SHOWTIME_SUCCESS": {
            toast.success("Cập nhật lịch chiếu thành công");
            return {
                ...state,
            };
        }
        case "UPDATE_SHOWTIME_FAIL": {
            toast.error("Lỗi cập nhật lịch chiếu");
            return {
                ...state,
            };
        }
        case "DELETE_SHOWTIME_SUCCESS": {
            toast.success("Xoá lịch chiếu thành công");
            const { showtimeId } = payload;
            return {
                ...state,
                showtimes: [...state.showtimes].filter(
                    (showtime) => showtime.id !== showtimeId
                ),
            };
        }
        case "DELETE_SHOWTIME_FAIL": {
            toast.error("Lỗi xoá lịch chiếu");
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default showtimeReducer;
