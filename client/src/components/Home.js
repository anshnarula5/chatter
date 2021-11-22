import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/actions/chat";
import Conversation from "./Conversation";

const Home = () => {
  const { conversations, loading: Cloading } = useSelector(
    (state) => state.chat
  );
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [messsages, setMessages] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, [isAuthenticated, loading, user]);

  const handleCurrent = (id) => {
    setCurrentChat(id);
  };

  if (!isAuthenticated) {
    return "Login to convo";
  }
  if (conversations.length === 0 && !loading && !Cloading) {
    return "No convos";
  }
  if (loading || Cloading) {
    return "...loading";
  }

  return (
    <Paper sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={4}>
          {conversations.length > 0 &&
            !loading &&
            conversations.map((conversation) => (
              <Button
                sx={{
                  display: "block",
                  width: "100%",
                  p: 1,
                  borderBottom: 0.3,
                }}
                variant = {currentChat === conversation._id ? "contained" : "text"}
                onClick={() => handleCurrent(conversation._id)}
              >
                <Conversation conversation={conversation} />
              </Button>
            ))}
        </Grid>
        <Grid item xs={8}>
          <Chat />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
