import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import Conversations from "./Conversations";
import Chat from "./Chat";

const Home = () => {
  return (
    <Paper sx = {{mt : 3}}>
      <Grid container>
        <Grid item xs={4}>
            <Conversations />
        </Grid>
        <Grid item xs={8} >
          <Chat />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
