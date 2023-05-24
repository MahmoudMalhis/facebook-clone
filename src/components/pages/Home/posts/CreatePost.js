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
import { useContext, useState } from "react";
import {
  CustomDialogActionsButton,
  CustomIconButtonImgUpload,
  CustomTextareaAutosize,
  StyledIconButton,
} from "./PostStyle";
import FilterIcon from "@mui/icons-material/Filter";
import { storage } from "../../../firebase";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ImageContext from "../../../../context/ImageContext";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { setImageUrls } = useContext(ImageContext);

  const handlePostClick = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `/image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setImageUrls((prevImageUrls) => [...prevImageUrls, downloadURL]);
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadAndClose = () => {
    handleUpload();
    handleClose();
    setFile(null);
    setSelectedImage(null);
  };

  return (
    <>
      <Box
        width="680px"
        backgroundColor="#fff"
        borderRadius="8px"
        padding="10px"
        overflowY="scroll"
        onClick={handlePostClick}
      >
        <Box display="flex" alignItems="center">
          <Avatar alt="Mahmoud" src="/static/images/avatar/2.jpg" />
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
            <Avatar />
            <Typography marginLeft="10px">mahmoud</Typography>
          </Box>
          <CustomTextareaAutosize placeholder="Whats on your mind, mahmoud?" />
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
