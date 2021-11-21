import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Conversation = () => {
  return (
    <Box sx = {{p : 1,  borderBottom: .3,}} >
      <Grid container>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1507599944477-f675212ef210?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            sx={{ width: 50, height: 50 }}
          />
        </Grid>
        <Grid item xs={9}  sx={{ px : 2, my : "auto" }}>
         <Typography >Name</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Conversation;
