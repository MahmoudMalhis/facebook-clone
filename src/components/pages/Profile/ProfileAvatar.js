import { useState, useContext } from "react";
import { firestore, storage } from "../../firebase";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import {
  StyledAvatar,
  StyledAvatarBox,
  StyledBottomAvatar,
  StyledUserName,
} from "./StyleProfile";
import PhotoDialog from "./PhotoDialog ";
import { FriendDataContext } from "../../../context/FriendDataContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { FriendPicContext } from "../../../context/FriendPicContext";

const ProfileAvatar = () => {
  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [fileProfilePic, setFileProfilePic] = useState(null);
  const [selectedImageProfilePic, setSelectedImageProfilePic] = useState(null);
  const [isProfilePicSelected, setIsProfilePicSelected] = useState(false);

  const { friendData } = useContext(FriendDataContext);
  const userDataContext = useContext(AuthContext);
  const userData = friendData ?? userDataContext;

  const { friendImage } = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  const handlePostClickProfilePic = () => {
    setOpenProfilePic(true);
  };

  const handleChangeProfilePic = (event) => {
    setFileProfilePic(event.target.files[0]);
    setSelectedImageProfilePic(URL.createObjectURL(event.target.files[0]));
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

  const handleCloseProfilePic = () => {
    setOpenProfilePic(false);
  };

  const handleUploadAndCloseProfilePic = () => {
    handleUploadProfilePic();
    handleCloseProfilePic();
  };

  return (
    <>
      <StyledAvatarBox>
        {friendData ? (
          isProfilePicSelected ? (
            <StyledAvatar
              alt={userData.fullName}
              src={profileImage.profilePicUrl}
            ></StyledAvatar>
          ) : (
            <StyledAvatar
              alt={userData.fullName}
              src={profileImage.profilePicUrl}
            ></StyledAvatar>
          )
        ) : isProfilePicSelected ? (
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
      <PhotoDialog
        open={openProfilePic}
        onClose={handleCloseProfilePic}
        onUploadAndClose={handleUploadAndCloseProfilePic}
        onChange={handleChangeProfilePic}
        selectedImage={profileImage.profilePicUrl}
      />
    </>
  );
};

export default ProfileAvatar;
