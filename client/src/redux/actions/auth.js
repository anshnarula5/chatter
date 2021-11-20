import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {setAlert} from "./alert";

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
      dispatch({type: "REGISTER_SUCCESS", payload: res.data});
      dispatch(setAlert("Signed In !", "success"))
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
      }
      dispatch({ type: "REGISTER_FAILURE" });
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
      dispatch({type: "LOGIN_SUCCESS", payload: res.data});
      dispatch(setAlert("Signed In !", "success"))
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "error")));
      }
      dispatch({ type: "REGISTER_FAILURE" });
    }
  };

  export const logout = () => (dispatch) => {
    dispatch({type: "LOGOUT"});
  };
  