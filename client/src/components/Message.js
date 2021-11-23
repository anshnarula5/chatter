import {Paper, Typography} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {useSelector} from "react-redux";
import { format } from "timeago.js";

const Message = ({own, message}) => {
  const toggle = useSelector(state => state.toggle)
  return (
    <Paper
      sx={{
        px: 2,
        py : 0.4,
        borderRadius: 3,
        my: 1,
        maxWidth: 500,
        backgroundColor: own ? "#1877f2" : "rgb(245, 241, 241)",
        color : own ? "white" : "inherit",
        alignSelf: own ? "flex-end" : "flex-start",
      }}
    >
      <Box sx = {{display : "flex", justifyContent : "space-between", color : !own && toggle && "black"}}>
      {message.text}
        <Typography variant="caption" sx={{ml: 3, mt: 1}}><small>{format(message.createdAt)}</small></Typography>
      </Box>
    </Paper>
  );
};

export default Message;
