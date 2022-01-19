import toast from "react-hot-toast";

const initialState = {
    movies: [],
    data: {},
    showtimes: [],
    comments: [],
};

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_MOVIES_SUCCESS": {
            return {
                ...state,
                movies: payload,
            };
        }
        case "GET_MOVIES_FAIL": {
            toast.error(payload);
            return {
                ...state,
                movies: [],
            };
        }
        case "REMOVE_MOVIES": {
            return {
                ...state,
                movies: [],
            };
        }
        case "GET_MOVIE_DETAIL_SUCCESS": {
            return {
                ...state,
                data: payload,
            };
        }
        case "GET_MOVIE_DETAIL_FAIL": {
            toast.error(payload);
            return {
                ...state,
                data: {},
            };
        }
        case "REMOVE_MOVIE_DETAIL": {
            return {
                ...state,
                data: {},
            };
        }
        case "GET_MOVIE_SHOWTIMES_SUCCESS": {
            return {
                ...state,
                showtimes: payload,
            };
        }
        case "GET_MOVIE_SHOWTIMES_FAIL": {
            toast.error(payload);
            return {
                ...state,
                showtimes: [],
            };
        }
        case "REMOVE_MOVIE_SHOWTIMES": {
            return {
                ...state,
                showtimes: [],
            };
        }
        case "GET_COMMENT_MOVIE": {
            return {
                ...state,
                comments: payload,
            };
        }

        case "CREATE_COMMENT_SUCCESS": {
            return {
                ...state,
            };
        }

        case "GET_COMMENT_MOVIE_FAIL": {
            toast.error(payload);
            return {
                ...state,
                comments: [],
            };
        }
        case "REMOVE_COMMENT_MOVIE": {
            return {
                ...state,
                comments: [],
            };
        }

        // admin

        case "GET_ADMIN_MOVIES_SUCCESS": {
            return {
                ...state,
                movies: payload,
            };
        }
        case "GET_ADMIN_MOVIES_FAIL": {
            toast.error(payload);
            return {
                ...state,
                movies: [],
            };
        }

        case "CREATE_MOVIE_SUCCESS": {
            toast.success("Thêm phim thành công");
            return {
                ...state,
            };
        }
        case "CREATE_MOVIE_FAIL": {
            toast.error("Lỗi thêm phim");
            return {
                ...state,
            };
        }

        case "UPDATE_MOVIE_SUCCESS": {
            toast.success("Cập nhật phim thành công");
            return {
                ...state,
            };
        }
        case "UPDATE_MOVIE_FAIL": {
            toast.error("Lỗi cập nhật phim");
            return {
                ...state,
            };
        }

        case "DELETE_MOVIE_SUCCESS": {
            toast.success("Xoá phim thành công");
            const { movieId } = payload;
            return {
                ...state,
                movies: [...state.movies].filter(
                    (movie) => movie.id !== movieId
                ),
            };
        }
        case "DELETE_MOVIE_FAIL": {
            toast.error("Lỗi xoá phim");
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

export default movieReducer;
