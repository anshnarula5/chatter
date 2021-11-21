import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import Conversations from "./Conversations";
import Chat from "./Chat";
import {useDispatch} from "react-redux"
import {getConversations} from "../redux/actions/chat";

const Home = () => {
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConversations())
  }, [])
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
