import toast from "react-hot-toast";

const initialState = {
    data: [],
    item: {},
    cineplexs: [],
};

const cineplexReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_CINEPLEXS_SUCCESS": {
            return {
                ...state,
                data: payload,
            };
        }
        case "GET_CINEPLEXS_FAIL": {
            toast.error(payload);
            return {
                ...state,
                data: [],
            };
        }
        case "REMOVE_CINEPLEXS": {
            return {
                ...state,
                data: [],
                item: {},
            };
        }
        case "GET_CINEPLEX_ITEM": {
            return {
                ...state,
                item: payload,
            };
        }
        case "REMOVE_CINEPLEX_ITEM": {
            return {
                ...state,
                item: {},
            };
        }

        // admin

        case "GET_CINEPLEX_SUCCESS": {
            return {
                ...state,
                cineplexs: payload,
            };
        }
        case "GET_CINEPLEX_FAIL": {
            toast.error(payload);
            return {
                ...state,
                cineplexs: [],
            };
        }

        case "CREATE_CINEPLEX_SUCCESS": {
            toast.success("Thêm cineplex thành công");
            return {
                ...state,
            };
        }
        case "CREATE_CINEPLEX_FAIL": {
            toast.error("Lỗi hệ thống");
            return {
                ...state,
            };
        }

        case "UPDATE_CINEPLEX_SUCCESS": {
            toast.success("Cập nhật Cineplex thành công");
            return {
                ...state,
            };
        }
        case "UPDATE_CINEPLEX_FAIL": {
            toast.error("Lỗi cập nhật");
            return {
                ...state,
            };
        }

        case "DELETE_CINEPLEX_SUCCESS": {
            toast.success("xoá cinelex thành công");
            const { cineplexId } = payload;
            return {
                ...state,
                cineplexs: [...state.cineplexs].filter(
                    (cineplex) => cineplex.id !== cineplexId
                ),
            };
        }
        case "DELETE_CINEPLEX_FAIL": {
            toast.error("xoá bị lỗi");
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default cineplexReducer;
