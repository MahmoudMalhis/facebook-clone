import {
  FormControl,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { dataHeader, dataTextField, data, radioGroup } from "./data";
import { useState } from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import TextFieldInput from "../Form/TextFieldInput ";

const SignUp = () => {
  const userInfo = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    selectedMonth: "",
    selectedDay: "",
    selectedYear: "",
    gender: "",
  };

  const [selectedValue, setSelectedValue] = useState(userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      selectedValue.lName,
      selectedValue.email,
      selectedValue.password,
      selectedValue.fName,
      selectedValue.selectedMonth,
      selectedValue.selectedDay,
      selectedValue.selectedYear,
      selectedValue.gender
    )
      .then((userCredential) => {
        console.log("User created successfully: ", userCredential);
        console.log(userCredential.user);
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
          <RadioGroup>
            {radioGroup.map((item) => {
              return (
                <FormControlLabel
                  key={item.id}
                  className={styles.label}
                  value={item.label}
                  label={item.label}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
          {data.map(({ id, label, variant, question }) => (
            <Box key={id} className={styles.input}>
              <Typography variant={variant}>
                {label} {question}
              </Typography>
            </Box>
          ))}
        </FormControl>
      </Box>
    </Box>
  );
};

export default SignUp;
