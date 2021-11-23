import { Avatar, Card, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({messages, user, users}) => {
  let friend = users.filter(u => u._id !== user._id)[0]
  return (
    <Box sx={{display: "flex", flexDirection: "column", }}>
      <Paper elevation = {6} sx = {{ backgroundColor : "#1976d2"}}>
      <Grid container  sx={{ px: 3, py: 1 ,}}>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src={friend.image}
            sx={{ width: 50, height: 50 }}
          />
        </Grid>
        <Grid item xs={9} sx={{ px: 2, my: "auto" }}>
            <Typography>{friend.name}</Typography>
        </Grid>
      </Grid>
      </Paper>
      <ScrollToBottom>
        <Box sx={{  flexGrow: 1,  height: "70vh"}}>
          <Box
            sx={{
              px: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((message) => (
              <Message message={message} own={message.sender === user._id} />
            ))}
          </Box>
        </Box>
      </ScrollToBottom>
    </Box>
  );
};

export default Chat;
