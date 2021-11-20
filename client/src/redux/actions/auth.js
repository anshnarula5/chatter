import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const URL = "http://localhost:5000/api";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${URL}/auth`);
    console.log(res.data);
    dispatch({ type: "LOAD_USER", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const register =
  ({ email, name, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${URL}/users`,
        { name, email, password },
        config
      );
      console.log(res.data);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        console.log(errors);
      }
      dispatch({ type: "REGISTER_FAIL" });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `${URL}/auth`,
        {email, password }
      );
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        console.log(errors);
      }
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  export const logout = () => (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
  