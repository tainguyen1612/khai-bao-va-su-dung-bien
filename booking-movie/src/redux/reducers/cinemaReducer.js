import toast from "react-hot-toast";

const initialState = {
    cinemas: [],
    types: [],
};

const cinemaReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_CINEMAS_SUCCESS": {
            return {
                ...state,
                cinemas: payload,
            };
        }
        case "GET_CINEMAS_FAIL": {
            toast.error(payload);
            return {
                ...state,
                cinemas: [],
            };
        }

        case "GET_CINEMAS_TYPES_SUCCESS": {
            return {
                ...state,
                types: payload,
            };
        }
        case "GET_CINEMAS_TYPES_FAIL": {
            toast.error(payload);
            return {
                ...state,
                types: [],
            };
        }

        case "CREATE_CINEMA_SUCCESS": {
            toast.success("Tạo cinema thành công");
            return {
                ...state,
            };
        }
        case "CREATE_CINEMA_FAIL": {
            toast.error("Tạo cinema lỗi");
            return {
                ...state,
            };
        }

        case "UPDATE_CINEMA_SUCCESS": {
            toast.success("Cập nhật cinema thành công");
            return {
                ...state,
            };
        }
        case "UPDATE_CINEMA_FAIL": {
            toast.error("Cập nhật lỗi");
            return {
                ...state,
            };
        }

        case "DELETE_CINEMA_SUCCESS": {
            toast.success("Xoá Cinema thành công");
            const { cinemaId } = payload;
            return {
                ...state,
                cinemas: [...state.cinemas].filter(
                    (cinema) => cinema.id !== cinemaId
                ),
            };
        }
        case "DELETE_CINEMA_FAIL": {
            toast.error("xoá Cinema lỗi");
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default cinemaReducer;
