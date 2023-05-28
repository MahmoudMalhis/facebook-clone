import { Box, Typography, List, ListItem } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import {
  StyledIconButton,
  StyledAvatar,
  StyledUserName,
  StyledBottomAvatar,
} from "./StyleProfile";
import { storage, firestore } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { ImageCover } from "./StyleProfile";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PhotoDialog from "./PhotoDialog ";
import MainPosts from "../Home/posts/MainPosts";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [file, setFile] = useState(null);
  const [fileProfilePic, setFileProfilePic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageProfilePic, setSelectedImageProfilePic] = useState(null);
  const [isProfilePicSelected, setIsProfilePicSelected] = useState(false);
  const userData = useContext(AuthContext);

  const handlePostClick = () => {
    setOpen(true);
  };

  const handlePostClickProfilePic = () => {
    setOpenProfilePic(true);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleChangeProfilePic = (event) => {
    setFileProfilePic(event.target.files[0]);
    setSelectedImageProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    let imageUrl = null;

    if (selectedImage) {
      const oldImageRef = ref(storage, `/coverPhotos/${file.name}`);
      try {
        await deleteObject(oldImageRef);
      } catch (error) {
        console.log(error);
      }
    }

    if (file) {
      const storageRef = ref(storage, `/coverPhotos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setSelectedImage(imageUrl);

        await setDoc(
          doc(firestore, "users", userData.email),
          { imageUrl },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      setFile(null);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", userData.email));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.imageUrl) {
            setSelectedImage(userData.imageUrl);
          }
          if (userData.profilePicUrl) {
            setSelectedImageProfilePic(userData.profilePicUrl);
            setIsProfilePicSelected(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userData.email]);

  const handleUploadProfilePic = async () => {
    let imageUrl = null;

    if (fileProfilePic) {
      const storageRef = ref(storage, `/profilePic/${fileProfilePic.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileProfilePic);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setSelectedImageProfilePic(imageUrl);
        await setDoc(
          doc(firestore, "users", userData.email),
          { profilePicUrl: imageUrl },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      setFileProfilePic(null);
      setIsProfilePicSelected(true);
      handleCloseProfilePic();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProfilePic = () => {
    setOpenProfilePic(false);
  };

  const handleUploadAndClose = () => {
    handleUpload();
    handleClose();
  };

  const handleUploadAndCloseProfilePic = () => {
    handleUploadProfilePic();
    handleCloseProfilePic();
  };

  return (
    <>
      <Box>
        <Box height="70vh">
          <Box width="1250px" height="50vh" margin="0 auto" position="relative">
            <ImageCover src={selectedImage} />
            <StyledIconButton onClick={handlePostClick}>
              <Typography marginLeft="10px">Edit cover photo</Typography>
            </StyledIconButton>
            <Box display="flex">
              {isProfilePicSelected ? (
                <StyledBottomAvatar onClick={handlePostClickProfilePic}>
                  <StyledAvatar
                    alt={userData.email}
                    src={selectedImageProfilePic}
                  >
                    <AddAPhotoIcon />
                  </StyledAvatar>
                </StyledBottomAvatar>
              ) : (
                <StyledBottomAvatar onClick={handlePostClickProfilePic}>
                  <StyledAvatar
                    alt={userData.email}
                    src={selectedImageProfilePic}
                  >
                    <AddAPhotoIcon />
                  </StyledAvatar>
                </StyledBottomAvatar>
              )}
              <StyledUserName>{userData.fullName}</StyledUserName>
            </Box>
          </Box>
        </Box>

        <PhotoDialog
          open={open}
          onClose={handleClose}
          onUploadAndClose={handleUploadAndClose}
          onChange={handleChange}
          selectedImage={selectedImage}
        />

        <PhotoDialog
          open={openProfilePic}
          onClose={handleCloseProfilePic}
          onUploadAndClose={handleUploadAndCloseProfilePic}
          onChange={handleChangeProfilePic}
          selectedImage={selectedImageProfilePic}
        />
      </Box>
      <Box bgcolor="#f0f2f5" paddingTop="30px">
        <Box
          width="1465px"
          margin="0 auto"
          display="flex"
          justifyContent="center"
        >
          <MainPosts />
          <Box
            bgcolor="#fff"
            height="fit-content"
            borderRadius="8px"
            marginLeft="15px"
          >
            <List>
              <ListItem>{`Gender: ${userData.gender}`}</ListItem>
              <ListItem>{`Barth day: ${userData.selectedYear} -  ${userData.selectedMonth} - ${userData.selectedDay}`}</ListItem>
              <ListItem>{`Email: ${userData.email}`}</ListItem>
              <ListItem>{`Age: ${
                new Date().getFullYear() - userData.selectedYear
              }`}</ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
