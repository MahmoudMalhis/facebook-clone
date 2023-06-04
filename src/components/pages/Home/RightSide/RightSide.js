import { Box, Typography } from "@mui/material";
import { CustomAvatar, CustomLink } from "../posts/PostStyle";
import { CustomRightSideBox, CustomSponsorBox } from "./StyledRightSid";
import { AuthContext } from "../../../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import LoadingDataContext from "../../../../context/LoadingDataContext";

const RightSide = () => {
  const userDataContext = useContext(AuthContext);
  const [friendConfirm, setFriendConfirm] = useState([]);

  useEffect(() => {
    try {
      const confirm = onSnapshot(
        collection(firestore, "users", userDataContext.email, "friend"),
        (snapshot) => {
          const confirmFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setFriendConfirm(confirmFriend);
        }
      );

      return () => {
        confirm();
      };
    } catch (error) {}
  }, [userDataContext.email]);

  return (
    <CustomRightSideBox>
      <Box padding="0px 25px 25px" borderBottom="1px solid #dedede">
        <Typography color="#999">Sponsored</Typography>
        <CustomSponsorBox>
          <img
            style={{ height: "65px" }}
            src="https://scontent.fjrs29-1.fna.fbcdn.net/v/t45.1600-4/347597126_23853512181490679_1831904922887367130_n.jpg?stp=dst-jpg_p476x249&_nc_cat=110&ccb=1-7&_nc_sid=eac8f0&_nc_ohc=y9tSW0clJ-EAX-yZYqL&_nc_ht=scontent.fjrs29-1.fna&oh=00_AfDMMZvMjsXMdVjDmb7tyxY5aufUKbzeir60FYy3i_JIsQ&oe=6473B0F6"
            alt="sponsor"
          />
          <Typography
            marginLeft="10px"
            marginTop="10px"
            fontWeight="bold"
            fontSize="13px"
          >
            Apply now to develop a skills Data Science
          </Typography>
        </CustomSponsorBox>
      </Box>
      <Box marginTop="20px" paddingLeft="25px">
        <Typography color="#999" marginBottom="20px">
          Contacts
        </Typography>
        {friendConfirm.map((friend) => {
          return (
            <CustomLink to={`/profile/${friend.senderId}`} key={friend.id}>
              <Box display="flex" alignItems="center">
                <CustomAvatar src={friend.Image} alt={friend.name} />
                <Typography>{friend.name}</Typography>
              </Box>
            </CustomLink>
          );
        })}
      </Box>
    </CustomRightSideBox>
  );
};

export default RightSide;
