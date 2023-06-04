import { FormControl, Box, Typography } from "@mui/material";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Logo from "../../Logo/Logo";
import { data, dataTextField } from "./logInData";
import TextFieldInput from "../../Form/TextFieldInput ";
import { useState, useEffect } from "react";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase";
import { useCookies } from "react-cookie";
import {
  CustomLogInBox,
  CustomLogoBox,
  CustomLogoTypography,
} from "./styledLogin";

const LogIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history("/home");
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const accessToken = userCredential.user.accessToken;
        setCookies("token", accessToken, { path: "/" });
        history("/home");
      })
      .catch((error) => {
        let message = error.message;
        let code = error.code;
        if (code === "auth/user-not-found") {
          message = "The email you entered isn’t connected to an account.";
          setError(message);
        } else if (code === "auth/wrong-password") {
          message = "The password you’ve entered is incorrect.";
          setError(message);
        } else if (code === "auth/invalid-email") {
          message = "Invalid email.";
          setError(message);
        } else if (code === "auth/missing-password") {
          message = "Enter the password.";
          setError(message);
        }
      });
  };
  return (
    <CustomLogInBox>
      <CustomLogoBox className={styles.logo}>
        <Logo />
        <CustomLogoTypography>
          Connect with friends and the world around you on Facebook.
        </CustomLogoTypography>
      </CustomLogoBox>
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
          <FormControl component="form" onSubmit={handleSubmit} fullWidth>
            {dataTextField.map((data) => (
              <TextFieldInput
                key={data.id}
                {...data}
                value={userData[data.value]}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    [data.name]: e.target.value,
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
            <Typography
              variant="h6"
              color="error"
              fontSize="0.67em"
              marginTop="10px"
            >
              {error}
            </Typography>
          </FormControl>
        </Box>
        <Typography className={styles.text}>
          <Link to="/signup">Create a Page</Link> for a celebrity, brand or
          business.
        </Typography>
      </Box>
    </CustomLogInBox>
  );
};

export default LogIn;
