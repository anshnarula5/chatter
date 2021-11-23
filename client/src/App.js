import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Navbar from "./components/layout/Navbar";
import { Container, Snackbar } from "@mui/material";
import Auth from "./components/Auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Popup from "./components/layout/Popup";
import Landing from "./components/Landing";
import Theme from "./components/layout/Theme";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const toggle = useSelector(state => state.toggle)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="app" style = {{backgroundColor : toggle ? "#292c35" : "#F6F6EF"}}>
      <Theme>
        <Router>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/chat" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </Container>
          <Popup />
        </Router>
      </Theme>
    </div>
  );
}

export default App;
