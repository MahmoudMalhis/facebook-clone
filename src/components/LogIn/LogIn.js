import { FormControl, Box, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import { data, dataTextField } from "./logInData";
import TextFieldInput from "../Form/TextFieldInput ";
import { useState } from "react";
import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [selectedValue, setSelectedValue] = useState({
    email: "",
    password: "",
  });
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f2f5"
    >
      <Box width="580px" paddingRight="32px" className={styles.logo}>
        <Logo />
        <Typography className={styles.connect}>
          Connect with friends and the world around you on Facebook.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="396px"
        height="456px"
        className={styles.input}
      >
        <Box
          padding="10px 0 24px"
          textAlign="center"
          bgcolor="#fff"
          borderRadius="8px"
          boxShadow="0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
          marginTop="40px"
          width="396px"
        >
          <FormControl component="form" onSubmit={""} fullWidth>
            {dataTextField.map((data) => (
              <TextFieldInput
                key={data.id}
                {...data}
                value={selectedValue[data.value]}
                onChange={(e) =>
                  setSelectedValue({
                    ...selectedValue,
                    [data.value]: e.target.value,
                  })
                }
              />
            ))}
            {data.map(({ id, label, variant, isForgot }) => (
              <Box key={id}>
                <Typography variant={variant}>
                  {isForgot ? (
                    <Link to="/forgot">{label}</Link>
                  ) : (
                    <Link to="signup">{label}</Link>
                  )}
                </Typography>
              </Box>
            ))}
          </FormControl>
        </Box>
        <Typography className={styles.text}>
          <Link to="/signup">Create a Page</Link> for a celebrity, brand or
          business.
        </Typography>
      </Box>
    </Box>
  );
};

export default LogIn;
