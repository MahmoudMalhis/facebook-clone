import { Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import {
  StyledIconButton,
  StyledAvatar,
  StyledUserName,
  StyledBottomAvatar,
  CustomProfileMainBox,
  CustomProfileInfoBox,
  StyledAvatarBox,
  AddFriend,
} from "./StyleProfile";
import { storage, firestore } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import { FriendDataContext } from "../../../context/FriendDataContext";
import { ImageCover } from "./StyleProfile";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PhotoDialog from "./PhotoDialog ";
import MainPosts from "../Home/posts/MainPosts";
import UserInfo from "./UserInfo";
import { FriendPicContext } from "../../../context/FriendPicContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [file, setFile] = useState(null);
  const [fileProfilePic, setFileProfilePic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageProfilePic, setSelectedImageProfilePic] = useState(null);
  const [isProfilePicSelected, setIsProfilePicSelected] = useState(false);
  const [isFriendAdded, setIsFriendAdded] = useState(false);

  const friendData = useContext(FriendDataContext);
  const userDataContext = useContext(AuthContext);
  const userData = friendData ?? userDataContext;

  const friendImage = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

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

  const handleAddFriend = async () => {
    try {
      const requestData = {
        senderId: userDataContext.email,
        receiverId: friendData.email,
        time: new Date().getTime(),
      };
      const notificationData = {
        senderId: userDataContext.email,
        senderName: userDataContext.fullName,
        time: new Date().getTime(),
        isClicked: false,
      };

      const requestDocRef = await addDoc(
        collection(firestore, "users", userDataContext.email, "friendRequest"),
        requestData
      );
      const notificationDocRef = await addDoc(
        collection(firestore, "users", friendData.email, "notifications"),
        notificationData
      );

      setIsFriendAdded(true);
    } catch (error) {
      console.log("error => " + error);
    }
  };

  return (
    <>
      <Box>
        <Box height="75vh">
          <CustomProfileMainBox>
            <ImageCover src={profileImage.cover} />
            {friendData ? (
              isFriendAdded ? (
                <AddFriend onClick={handleAddFriend}>
                  <PersonAddIcon />
                  <Typography marginLeft="5px">Add Friend</Typography>
                </AddFriend>
              ) : (
                <AddFriend>
                  <DownloadDoneIcon />
                  <Typography marginLeft="5px">Added</Typography>
                </AddFriend>
              )
            ) : (
              <StyledIconButton onClick={handlePostClick}>
                <Typography
                  marginLeft="10px"
                  color="#0573e7"
                  bgcolor="#f0f2f5"
                  padding="5px 10px"
                  borderRadius="5px"
                  fontSize="10px"
                >
                  Edit cover photo
                </Typography>
              </StyledIconButton>
            )}
            <StyledAvatarBox>
              {isProfilePicSelected ? (
                <StyledBottomAvatar onClick={handlePostClickProfilePic}>
                  <StyledAvatar
                    alt={userData.fullName}
                    src={profileImage.profilePicUrl}
                  >
                    <AddAPhotoIcon />
                  </StyledAvatar>
                </StyledBottomAvatar>
              ) : (
                <StyledBottomAvatar onClick={handlePostClickProfilePic}>
                  <StyledAvatar
                    alt={userData.fullName}
                    src={profileImage.profilePicUrl}
                  >
                    <AddAPhotoIcon />
                  </StyledAvatar>
                </StyledBottomAvatar>
              )}
              <StyledUserName>{userData.fullName}</StyledUserName>
            </StyledAvatarBox>
          </CustomProfileMainBox>
        </Box>

        <PhotoDialog
          open={open}
          onClose={handleClose}
          onUploadAndClose={handleUploadAndClose}
          onChange={handleChange}
          selectedImage={profileImage.cover}
        />

        <PhotoDialog
          open={openProfilePic}
          onClose={handleCloseProfilePic}
          onUploadAndClose={handleUploadAndCloseProfilePic}
          onChange={handleChangeProfilePic}
          selectedImage={profileImage.profilePicUrl}
        />
      </Box>
      <Box bgcolor="#f0f2f5" padding="30px">
        <CustomProfileInfoBox>
          <MainPosts />
          <UserInfo />
        </CustomProfileInfoBox>
      </Box>
    </>
  );
};

export default Profile;
