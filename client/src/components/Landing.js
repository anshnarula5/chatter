import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Landing = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(false);
  const handleFollow = async (receiverId) => {
    console.log(receiverId.toString());
    const res = await axios.post("http://localhost:5000/api/conversations", {
      receiverId,
    });
    setFollowing((prev) => !prev);
    console.log(res.data);
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/all");
      let users = res.data.filter((u) => u._id !== user?._id);
      user?.conversations.forEach((c) =>
        users.forEach((u) => {
          if (u.conversations.includes(c)) {
            users.splice(users.indexOf(u), 1);
          }
        })
      );
      setUsers(users);
    };
    getAllUsers();
  }, [loading, user, following]);

  return (
    <Box sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {users.length > 0 &&
              !loading &&
              users.map((user) => (
                <Card
                  sx={{
                    backgroundColor: "yellow",
                    px: 3,
                    py: 1,
                    mr: 3,
                    mb: 2,
                    minWidth: 150,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={user?.image} />
                    <Typography>{user?.name}</Typography>
                    <Button size="small" onClick={() => handleFollow(user._id)}>
                      Follow
                    </Button>
                  </Box>
                </Card>
              ))}
          </Box>
          <Box>
            <Link to="/chat">
              <Button>Open chatbox</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia component="img" image={user?.image} alt="green iguana" />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </CardContent>
            <CardActions sx={{ textAlign: "center" }}>
              <Button>Change profile image</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
