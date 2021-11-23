import { Avatar, Card, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ messages, user }) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", }}>
      <Paper elevation = {6} sx = {{ backgroundColor : "#1976d2"}}>
      <Grid container  sx={{ px: 3, py: 1 ,}}>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1507599944477-f675212ef210?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            sx={{ width: 50, height: 50 }}
          />
        </Grid>
        <Grid item xs={9} sx={{ px: 2, my: "auto" }}>
          <Typography>Name</Typography>
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
