import {GET_CONVERSATIONS, REMOVE_CONVERSATIONS} from "../types"
import axios from "axios"

const URL = "http://localhost:5000/api"

export const getConversations = () => async (dispatch) => {
    try {
        const res = await axios.get(`${URL}/conversations`)
        dispatch({type: GET_CONVERSATIONS, payload : res.data})
    } catch (error) {
        console.log(error)
    }
}

export const removeConversations = () => dispatch => {
    dispatch({type : REMOVE_CONVERSATIONS})
}