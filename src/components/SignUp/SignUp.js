import { FormControl, Box, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import { dataHeader, dataTextField, data } from "./data";
import { useState } from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import TextFieldInput from "../Form/TextFieldInput ";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [selectedValue, setSelectedValue] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    selectedMonth: "",
    selectedDay: "",
    selectedYear: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      selectedValue.email,
      selectedValue.password
    )
      .then((userCredential) => {
        console.log("User created successfully: ", userCredential);
      })
      .catch((error) => {
        console.log("Error creating user: ", error);
      });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      className={styles.main}
    >
      <Logo />
      <Box
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        className={styles.box}
      >
        <Box className={styles.text}>
          {dataHeader.map((item) => (
            <Typography
              key={item.id}
              className={styles.paragraph}
              component={item.component}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
        <FormControl
          component="form"
          onSubmit={handleSubmit}
          fullWidth
          className={styles.form}
        >
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
          {data.map(({ id, label, variant, question, isAccount }) => (
            <Box key={id} className={styles.input}>
              <Typography variant={variant}>
                {isAccount ? (
                  <Link to="/">{label}</Link>
                ) : (
                  <>
                    {label} {question}
                  </>
                )}
              </Typography>
            </Box>
          ))}
        </FormControl>
      </Box>
    </Box>
  );
};

export default SignUp;
