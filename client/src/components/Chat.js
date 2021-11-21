import { Avatar, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Messages from "./Messages";

const Chat = () => {
  return (
    <Box sx={{ borderLeft: 0.2}}>
      <Box sx = {{display :"flex", flexDirection: 'column'}}>
        <Grid container sx={{ px: 3, py: 1, backgroundColor: "red" }}>
          <Grid item xs={2}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1507599944477-f675212ef210?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={9} sx={{ px: 2, my: "auto" }}>
            <Typography>Name</Typography>
          </Grid>
        </Grid>
        <Box sx={{ height : "80vh", flexGrow : 1 , backgroundColor : "blue"}}>
          <Messages />
        </Box>
        <TextField id="outlined-basic" variant="outlined" />
      </Box>
    </Box>
  );
};

export default Chat;
