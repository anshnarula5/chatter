import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'


const Conversation = ({conversation}) => {
  const {user, authLoading} = useSelector(state => state.auth)
  const [friend, setFriend] = useState({})
  useEffect(() => {
    const friendId = conversation.members.filter(member => member !== user?._id)
    const getUserById = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${friendId}`);
        setFriend(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUserById()
  }, [])
  return (
    <Box sx = {{p : 1,  borderBottom: .3}} >
      <Grid container>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src={friend.image}
            sx={{ width: 50, height: 50 }}
          />
        </Grid>
        <Grid item xs={9}  sx={{ px : 2, my : "auto" }}>
          <Typography >{friend.name}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Conversation;
