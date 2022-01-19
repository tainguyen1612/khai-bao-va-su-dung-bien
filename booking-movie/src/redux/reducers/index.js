import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import showtimeReducer from "./showtimeReducer";
import bookingReducer from "./bookingReducer";
import cineplexReducer from "./cineplexReducer";
import newsReducer from "./newsReducer";
import cinemaReducer from "./cinemaReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    movie: movieReducer,
    cinema: cinemaReducer,
    showtime: showtimeReducer,
    booking: bookingReducer,
    cineplex: cineplexReducer,
    news: newsReducer,
});

export default rootReducer;
