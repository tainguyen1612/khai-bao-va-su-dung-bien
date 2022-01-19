import userBookingApi from "../../api/users/bookingApi";

export const updateBookingAction = (seat, price, e) => async (
    dispatch,
    getState
) => {
    let { seats, total } = getState().booking;

    if (seats.length === 8 && !seats.includes(seat)) {
        alert("Chỉ được chọn tối đa 8 ghế!");
    } else {
        if (seats.includes(seat)) {
            seats = seats.filter((item) => item !== seat);
            total -= price;
        } else if (seats.length < 8 && !seats.includes(seat)) {
            seats.push(seat);
            total += price;
        }
        e.target.classList.toggle("selected");
        dispatch({
            type: "UPDATE_BOOKING",
            payload: { total, seats },
        });
    }
};

export const userGetBookingAction = () => async (dispatch, getState) => {
    try {
        let { accessToken } = getState().auth;
        const response = await userBookingApi.getByUserId(accessToken);
        if (!response.error) {
            dispatch({
                type: "USER_GET_BOOKINGS_SUCCESS",
                payload: response.bookings,
            });
        } else {
            dispatch({
                type: "USER_GET_BOOKINGS_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "USER_GET_BOOKINGS_FAIL",
            payload: error.message,
        });
    }
};

export const createBookingAction = (data, history) => async (
    dispatch,
    getState
) => {
    try {
        let { accessToken } = getState().auth;
        const { showtime, booking } = data;
        const body = {
            showtime_id: showtime.id,
            seats: booking.seats,
        };
        const response = await userBookingApi.create(body, accessToken);
        if (!response.error) {
            dispatch({
                type: "CREATE_BOOKING_SUCCESS",
                payload: response,
            });
            history.replace({
                pathname: `/payment/${response.b_number}`,
                state: data,
            });
        } else {
            dispatch({
                type: "CREATE_BOOKING_FAIL",
                payload: response.error,
            });
        }
    } catch (error) {
        dispatch({
            type: "CREATE_BOOKING_FAIL",
            payload: error.message,
        });
    }
};
