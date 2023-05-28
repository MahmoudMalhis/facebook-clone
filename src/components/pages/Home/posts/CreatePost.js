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
import { useState, useContext } from "react";
import {
  CustomDialogActionsButton,
  CustomIconButtonImgUpload,
  CustomTextareaAutosize,
  StyledIconButton,
} from "./PostStyle";
import FilterIcon from "@mui/icons-material/Filter";
import { storage, firestore } from "../../../firebase";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfilePicContext } from "../../../../context/ProfilePicContext";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState("");
  const userData = useContext(AuthContext);
  const profileImage = useContext(ProfilePicContext);

  const handlePostClick = () => {
    setOpen(true);
  };

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
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const post = {
        imageUrl,
        text: postText,
        createdAt: new Date().toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };
      const docRef = await addDoc(
        collection(firestore, "users", userData.email, "posts"),
        post
      );
      console.log("id" + docRef.path);
      // setPostId(docRef.id);
      // console.log(postId);
      setFile(null);
      setSelectedImage(null);
      setPostText("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadAndClose = () => {
    handleUpload();
    handleClose();
  };

  return (
    <>
      <Box
        maxWidth="100%"
        backgroundColor="#fff"
        borderRadius="8px"
        padding="10px"
        overflowY="scroll"
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
                    overflowY: "scroll",
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
        <DialogActions justifyContent="center">
          <CustomDialogActionsButton
            width="100%"
            onClick={handleUploadAndClose}
          >
            Posts
          </CustomDialogActionsButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost;
