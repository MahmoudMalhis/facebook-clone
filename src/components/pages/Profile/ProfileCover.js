import { Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { firestore, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import { ImageCover, StyledIconButton } from "./StyleProfile";
import PhotoDialog from "./PhotoDialog ";
import { FriendDataContext } from "../../../context/FriendDataContext";
import { FriendPicContext } from "../../../context/FriendPicContext";
import { useParams } from "react-router-dom";
import AddFriendButton from "./AddFriendButton";

const ProfileCoverPhoto = () => {
  const { email } = useParams();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { friendData, setEmailAddressForData } = useContext(FriendDataContext);
  const userDataContext = useContext(AuthContext);
  const userData = friendData ?? userDataContext;

  const { friendImage, setEmailAddress } = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  useEffect(() => {
    setEmailAddress(email);
    setEmailAddressForData(email);
  }, [email, setEmailAddress, setEmailAddressForData]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    let imageUrl = null;

    if (selectedImage) {
      const oldImageRef = ref(storage, `/coverPhotos/${file.name}`);
      try {
        await deleteObject(oldImageRef);
      } catch (error) {
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
      }
    }

    try {
      setFile(null);
      handleClose();
    } catch (error) {
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadAndClose = () => {
    handleUpload();
    handleClose();
  };

  const handlePostClick = () => {
    setOpen(true);
  };

  return (
    <>
      <ImageCover src={profileImage?.cover} />
      {friendData ? (
        <AddFriendButton />
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
      <PhotoDialog
        open={open}
        onClose={handleClose}
        onUploadAndClose={handleUploadAndClose}
        onChange={handleChange}
        selectedImage={profileImageContext.cover}
      />
    </>
  );
};

export default ProfileCoverPhoto;
