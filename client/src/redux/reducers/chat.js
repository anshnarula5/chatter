import { GET_CONVERSATIONS, REMOVE_CONVERSATIONS } from "../types";

const initialState = {
  conversations: [],
  loading: true,
};

const chat = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONVERSATIONS:
      return {...state, conversations: payload, loading: false};
    case REMOVE_CONVERSATIONS:
      return {...state, conversations : [], loading : false }
    default:
      return state;
  }
};
export default chat;
