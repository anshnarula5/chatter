const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading : true
}

const auth = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case "LOAD_USER":
            return {...state, isAuthenticated : true, user : payload, loading : false}
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", payload.token)
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false,
            };
        default:
            return state;
    }
}

export default auth