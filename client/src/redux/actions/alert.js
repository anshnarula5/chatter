export const setAlert = (message, type) => dispatch => {
    const id = Math.random()
    dispatch({type: "SET_ALERT", payload: {message, type, id}})
    setTimeout(() => {
        dispatch({type : "REMOVE_ALERT", payload : id})
    }, 3000)
}