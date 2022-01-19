import toast from "react-hot-toast";

const initialState = {
    total: 0,
    seats: [],
    list: [],
};

const bookingReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "UPDATE_BOOKING": {
            return {
                ...state,
                total: payload.total,
                seats: payload.seats,
            };
        }
        case "REMOVE_BOOKING": {
            toast.success("Xoá thành công");
            return {
                ...state,
                total: 0,
                seats: [],
            };
        }
        case "CREATE_BOOKING_SUCCESS": {
            return {
                ...state,
            };
        }
        case "CREATE_BOOKING_FAIL": {
            toast.error(payload);
            return {
                ...state,
            };
        }
        case "USER_GET_BOOKINGS_SUCCESS": {
            return {
                ...state,
                list: payload,
            };
        }
        case "USER_GET_BOOKINGS_FAIL": {
            toast.error(payload);
            return {
                ...state,
                list: [],
            };
        }
        case "REMOVE_USER_BOOKINGS": {
            toast.success("Xoá thành công");
            return {
                ...state,
                list: [],
            };
        }
        default:
            return state;
    }
};

export default bookingReducer;
