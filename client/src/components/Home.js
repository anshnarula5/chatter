import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/actions/chat";
import Conversation from "./Conversation";
import axios from "axios";
import { Box } from "@mui/system";
import { io } from "socket.io-client";
import SendIcon from '@mui/icons-material/Send';

const Home = () => {
  const socket = useRef();
  const { conversations, loading: Cloading } = useSelector(
    (state) => state.chat
  );
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    conversations &&
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.users.filter((user) => user._id === arrivalMessage.sender)
        .length > 0 &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    !loading && user && socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user, loading]);

  //socketio
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8000");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  //react

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, [isAuthenticated, loading, user]);

  const handleCurrent = (id) => {
    setCurrentChat(id);
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiver = currentChat?.users.find(
      (member) => member._id !== user?._id
    );
    const receiverId = receiver._id;
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${currentChat._id}`
        );
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
                  borderRadius : 0,
                  borderBottom: 0.1,
                  
                }}
                variant={
                  currentChat?._id === conversation._id ? "contained" : "text"
                }
                onClick={() => handleCurrent(conversation)}
              >
                <Conversation conversation={conversation} />
              </Button>
            ))}
        </Grid>
        <Grid item xs={8} sx={{ borderLeft: 0.1, minHeight: "80vh", borderColor : "#E9FFFF" }}>
          <>
            {currentChat ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Chat messages={messages} user={user} />
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      variant="outlined"
                      fullWidth={true}
                      value={newMessage}
                      onChange={handleChange}
                      sx = {{borderRadius : 0}}
                    />
                  </Box>
                  <Button variant="contained" endIcon={<SendIcon />}  onClick={handleSubmit}  sx={{ mx: "auto", borderRadius : 0 }}>
                    Send
                  </Button>
                </Box>
              </Box>
            ) : (
                <Box sx = {{textAlign : "center", mt : 35}}>
                  <Typography variant = "h5" > Open a convo to see messages</Typography>
                </Box>
            )}
          </>
        </Grid>
      </Grid>
      
    </Paper>
  );
};

export default Home;
