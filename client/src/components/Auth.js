import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import {Navigate} from "react-router-dom"

import { Paper, TextField, Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {login, register} from "../redux/actions/auth";

const Auth = () => {
  const {isAuthenticated} = useSelector(state => state.auth)
    const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = formData;
  const handleToggle = () => {
    setToggle((inintial) => !inintial);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleRegister = () => {
        dispatch(register(formData))
  }
  const handleLogin = () => {
    dispatch(login({email, password}))
  }
  if (isAuthenticated) {
    return <Navigate to = "/"/>
  }
  
  return (
    <Paper
      sx={{
        width: { md: 400 },
        mx: { md: "auto", xs: 1 },
        mt: 5,
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        {toggle ? "Signup" : "Login"}
      </Typography>

      {toggle && (
        <TextField
          value={name}
          name="name"
          id="standard-basic"
          label="Name"
          variant="standard"
          sx={{ my: 2 }}
          onChange={handleChange}
        />
      )}

      <TextField
        value={email}
        name="email"
        id="standard-basic"
        label="Email"
        variant="standard"
        sx={{ my: 2 }}
        onChange={handleChange}
      />

      <TextField
        sx={{ my: 2 }}
        value={password}
        id="standard-basic"
        label="Password"
        variant="standard"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Typography align="center" sx={{ mt: 4 }}>
        {toggle ? "Already" : "Don't"} have an account ?{" "}
        <Button variant="text" onClick={handleToggle}>
          {!toggle ? "Sign Up" : "Login"}
        </Button>
      </Typography>
      {toggle ? (
        <Button variant="contained" sx={{ my: 3 }} onClick = {handleRegister}>
          Register
        </Button>
      ) : (
        <Button variant="contained" sx={{ my: 3 }} onClick = {handleLogin}>
          Login
        </Button>
      )}

      <Button variant="contained" sx={{ mb: 3 }}>
        <GoogleIcon />{" "}
        <Typography sx={{ mx: 2 }}> Sign in with Google</Typography>
      </Button>
    </Paper>
  );
};

export default Auth;
