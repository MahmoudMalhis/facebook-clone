import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material";
import {
  CustomDialogActionsButton,
  CustomIconButtonImgUpload,
  CustomTextareaAutosize,
} from "./PostStyle";
import FilterIcon from "@mui/icons-material/Filter";
import { AuthContext } from "../../../../context/AuthContext";
import { FriendPicContext } from "../../../../context/FriendPicContext";
import { ProfilePicContext } from "../../../../context/ProfilePicContext";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "../../../firebase";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/database";

const CreatePostDialog = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState("");
  const userData = useContext(AuthContext);
  const { friendImage } = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleInputChange = (event) => {
    setPostText(event.target.value);
  };

  const handleUpload = async () => {
    let imageUrl = null;

    if (file) {
      const storageRef = ref(storage, `/image/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      } catch (error) {}
    }

    try {
      const post = {
        imageUrl,
        text: postText,
        createdAt: new Date().toLocaleString(),
      };
      await addDoc(
        collection(firestore, "users", userData.email, "posts"),
        post
      );
      setFile(null);
      setSelectedImage(null);
      setPostText("");
      handleClose();
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadAndClose = () => {
    handleUpload();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        textAlign="center"
        borderBottom="1px solid #ddd"
        width="500px"
        margin="auto"
      >
        Create post
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" margin="20px 0">
          <Avatar alt={userData.fullName} src={profileImage.profilePicUrl} />
          <Typography marginLeft="10px">{userData.fullName}</Typography>
        </Box>
        <CustomTextareaAutosize
          value={postText}
          onChange={handleInputChange}
          placeholder={`Whats on your mind, ${userData.fullName}?`}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <CustomIconButtonImgUpload component="span">
            {selectedImage ? (
              <img
                style={{
                  width: "auto",
                  height: "auto",
                  msOverflowY: "scroll",
                }}
                src={selectedImage}
                alt="Uploaded"
              />
            ) : (
              <FilterIcon />
            )}
          </CustomIconButtonImgUpload>
        </label>
      </DialogContent>
      <DialogActions>
        <CustomDialogActionsButton width="100%" onClick={handleUploadAndClose}>
          Posts
        </CustomDialogActionsButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialog;
