import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { CustomLinearScaleIcon } from "../PostStyle";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostHeader = ({ post }) => {
  const [anchorPost, setAnchorPost] = useState(null);

  const handlePostMenu = (event) => {
    setAnchorPost(event.currentTarget);
  };

  const handleClosePostMenu = () => {
    setAnchorPost(null);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Avatar />
        <Box marginLeft="10px">
          <Typography fontWeight="700">Mahmoud</Typography>
          <Typography fontSize="12px" color="#999">
            {post.createdAt}
          </Typography>
        </Box>
      </Box>
      <Tooltip>
        <IconButton onClick={handlePostMenu}>
          <CustomLinearScaleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorPost}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorPost)}
        onClose={handleClosePostMenu}
      >
        <MenuItem onClick={handleClosePostMenu}>
          <BookmarkIcon />
          <Typography textAlign="center">Saved</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PostHeader;
