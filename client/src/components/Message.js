import { Box } from "@mui/system";
import React from "react";

const Message = ({ own, message }) => {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 3,
        my: 1,
        backgroundColor: "yellow",
        maxWidth: 300,
        alignSelf: own ? "flex-end" : "flex-start",
      }}
    >
      {message.text}
    </Box>
  );
};

export default Message;
