import { Avatar, Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { StyledIconButton } from "./PostStyle";
import FilterIcon from "@mui/icons-material/Filter";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfilePicContext } from "../../../../context/ProfilePicContext";
import { FriendPicContext } from "../../../../context/FriendPicContext";
import CreatePostDialog from "./CreatePostDialog";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const userData = useContext(AuthContext);
  const { friendImage } = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  const handlePostClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        maxWidth="100%"
        backgroundColor="#fff"
        borderRadius="8px"
        padding="10px"
        onClick={handlePostClick}
      >
        <Box display="flex" alignItems="center">
          <Avatar alt={userData.fullName} src={profileImage.profilePicUrl} />
          <Box
            width="100%"
            height="15px"
            borderRadius="50px"
            backgroundColor="#f0f2f5"
            marginLeft="8px"
            padding="8px 12px"
          />
        </Box>
        <StyledIconButton>
          <FilterIcon />
          <Typography marginLeft="10px">Photo/video</Typography>
        </StyledIconButton>
      </Box>
      <CreatePostDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default CreatePost;
