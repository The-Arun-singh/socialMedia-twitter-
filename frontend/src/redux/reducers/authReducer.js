const initialState = {
    user: {}
}

// this is auth reducer , used to handle the internal state of the user authentication
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, user: action.payload,
            };
        case "UPDATE":
            return {
                ...state, user: action.payload,
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default authReducer;