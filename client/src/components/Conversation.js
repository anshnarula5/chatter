import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Conversation = ({conversation}) => {
  const {user, loading} = useSelector((state) => state.auth);
  const [currentConvo, setCurrentConvo] = useState(null)
  const [friend, setFriend] = useState({});
  const handleCurrent = () => {
    setCurrentConvo(conversation._id)
  }
  useEffect(() => {
    console.log(currentConvo)
    const friendId =
      !loading && conversation.members.filter((member) => member !== user?._id);
    if (friendId) {
      const getUserById = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/auth/${friendId}`
          );
          setFriend(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUserById();
    } else {
      console.log("NONONONONONONo");
    }
  }, [loading, user, conversation]);

  if (loading) return "...Loading";

  return (
    <Button sx={{display: "block", width: "100%", p: 1, borderBottom: 0.3}} variant= {currentConvo && "contained"} onClick = {handleCurrent} >
        <Grid container>
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
    </Button>
  );
};

export default Conversation;
