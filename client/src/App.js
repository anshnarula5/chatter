import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Navbar from "./components/layout/Navbar";
import { Container } from "@mui/material";
import Auth from "./components/Auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadUser} from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./components/layout/Alert";
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    <Router>
      <Navbar />
      <Container>
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
