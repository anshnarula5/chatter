import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Conversation = ({ conversation }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const [friend, setFriend] = useState({});

  useEffect(() => {
    if (!loading && user) {
      const f = conversation.users.filter((u) => u?._id !== user?._id);
      console.log(f[0]);
      console.log(user)
      setFriend(f[0]);
    }
  }, [loading, user]);

  if (loading) {
    return "...loading"
  }

  return (
    
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
    
  );
};

export default Conversation;

// const [currentConvo, setCurrentConvo] = useState(null)
// const handleCurrent = () => {
//   setCurrentConvo(conversation._id)
// }
// useEffect(() => {
//   console.log(currentConvo)
//   const friendId =
//     !loading && conversation.members.filter((member) => member !== user?._id);
//   if (friendId) {
//     const getUserById = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/auth/${friendId}`
//         );
//         setFriend(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUserById();
//   } else {
//     console.log("NONONONONONONo");
//   }
// }, [loading, user, conversation]);

// if (loading) return "...Loading";
