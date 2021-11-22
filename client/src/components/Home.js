import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/actions/chat";
import Conversation from "./Conversation";
import axios from "axios";
import {Box} from "@mui/system";

const Home = () => {
  const { conversations, loading: Cloading } = useSelector(
    (state) => state.chat
  );
  const [newMessage, setNewMessage] = useState("")
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, [isAuthenticated, loading, user]);

  const handleCurrent = (id) => {
    setCurrentChat(id);
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSubmit = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/messages", message)
      console.log(res.data)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      console.log(currentChat);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat}`
        );
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

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
    <Paper sx={{ mt: 3, minHeight: "80vh" }}>
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
                variant={
                  currentChat === conversation._id ? "contained" : "text"
                }
                onClick={() => handleCurrent(conversation._id)}
              >
                <Conversation conversation={conversation} />
              </Button>
            ))}
        </Grid>
        <Grid item xs={8}>
          <>
            {currentChat ? (
              <Box sx={{ borderLeft: 0.2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "70vh",
                    justifyContent: "space-between",
                  }}
                >
                  <Chat messages={messages} user={user} />
                  <Grid container>
                    <Grid item xs={10}>
                      <TextField variant="outlined" fullWidth={true} value={newMessage} onChange = {handleChange} />
                    </Grid>
                    <Button item xs={2} sx={{ mx: "auto" }} variant="text" onClick = {handleSubmit}>
                      send msg
                    </Button>
                  </Grid>
                </Box>
              </Box>
            ) : (
              "Open a convo to see messages"
            )}
          </>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
