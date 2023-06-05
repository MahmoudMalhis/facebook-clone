import { Box } from "@mui/material";
import { CustomProfileMainBox, CustomProfileInfoBox } from "./StyleProfile";
import MainPosts from "../Home/posts/MainPosts";
import UserInfo from "./UserInfo";
import ProfileCoverPhoto from "./ProfileCover";
import ProfileAvatar from "./ProfileAvatar";

const Profile = () => {
  return (
    <>
      <Box height="75vh">
        <CustomProfileMainBox>
          <ProfileCoverPhoto />
          <ProfileAvatar />
        </CustomProfileMainBox>
      </Box>
      <Box bgcolor="#f0f2f5" padding="30px">
        <CustomProfileInfoBox>
          <MainPosts type="profile" />
          <UserInfo />
        </CustomProfileInfoBox>
      </Box>
    </>
  );
};

export default Profile;
