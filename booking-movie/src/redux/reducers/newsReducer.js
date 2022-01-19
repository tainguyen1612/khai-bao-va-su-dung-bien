const initialState = {
    data: [],
    item: {},
};

const newsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_NEWS_SUCCESS": {
            return {
                ...state,
                data: payload,
            };
        }
        case "GET_DETAIL_NEWS": {
            return {
                ...state,
                item: payload,
            };
        }
        default:
            return state;
    }
};

export default newsReducer;
