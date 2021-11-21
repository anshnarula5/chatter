import { Box } from "@mui/system";
import React from "react";

const Message = ({ own }) => {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 3,
        my: 1,
        backgroundColor: "yellow",
        maxWidth: 300,
        alignSelf: own ? "flex-end" : "'flex-start",
      }}
    >
      Hello hsdas das dsasa d asda da da
    </Box>
  );
};

export default Message;
