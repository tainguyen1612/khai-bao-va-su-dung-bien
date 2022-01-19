export const getShowtimeDetailSelector = (state) =>
    state.showtime.data.showtime;
export const getResetSeatsSelector = (state) => state.showtime.data.reset_seats;
export const getShowtimeSeatsSelector = (state) => state.showtime.array;
export const getAllShowtimesByCineplexSelector = (state) =>
    state.showtime.showtimes;
export const getShowtimesSelector = (state) => state.showtime.showtimes;
