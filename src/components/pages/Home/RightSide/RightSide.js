import { Box, Typography } from "@mui/material";
import { CustomAvatar } from "../posts/PostStyle";
import { database } from "../../../firebase";
import {
  ref,
  push,
  child,
  update,
  set,
  get,
  orderByChild,
  equalTo,
} from "firebase/database";

const RightSide = () => {
  return (
    <Box>
      <Box padding="0px 25px 25px" borderBottom="1px solid #dedede">
        <Typography color="#999">Sponsored</Typography>
        <Box display="flex" alignItems="center">
          <img
            style={{ height: "65px" }}
            src="https://scontent.fjrs29-1.fna.fbcdn.net/v/t45.1600-4/347597126_23853512181490679_1831904922887367130_n.jpg?stp=dst-jpg_p476x249&_nc_cat=110&ccb=1-7&_nc_sid=eac8f0&_nc_ohc=y9tSW0clJ-EAX-yZYqL&_nc_ht=scontent.fjrs29-1.fna&oh=00_AfDMMZvMjsXMdVjDmb7tyxY5aufUKbzeir60FYy3i_JIsQ&oe=6473B0F6"
            alt="sponsor"
          />
          <Typography marginLeft="10px" fontWeight="bold" fontSize="13px">
            Apply now to develop a skills Data Science
          </Typography>
        </Box>
      </Box>
      <Box marginTop="20px" paddingLeft="25px">
        <Typography color="#999" marginBottom="20px">
          Contacts
        </Typography>
        <Box display="flex" alignItems="center">
          <CustomAvatar />
          <Typography>Mahmoud</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RightSide;
