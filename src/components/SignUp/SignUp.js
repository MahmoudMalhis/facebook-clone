import {
  FormControl,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import Logo from "../Logo/Logo";
import { dataHeader, dataTextField, data, radioGroup } from "./data";
import { useState } from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, push, child, update } from "firebase/database";
import { auth, database } from "../firebase";
import TextFieldInput from "../Form/TextFieldInput ";

const SignUp = () => {
  const userInfo = {
    lName: "",
    fName: "",
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
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        selectedValue.email,
        selectedValue.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${selectedValue.fName} ${selectedValue.lName}`,
      });
      console.log("User created successfully: ", userCredential);
      console.log(userCredential.user);
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  return (
    <Box textAlign="center" className={styles.main}>
      <Logo />
      <Grid
        container
        xs={10}
        sm={8}
        md={6}
        lg={4}
        xl={3}
        justifyContent={"center"}
        className={styles.box}
      >
        <Grid item xs={12} className={styles.text}>
          {dataHeader.map((item) => (
            <Typography
              key={item.id}
              className={styles.paragraph}
              component={item.component}
            >
              {item.label}
            </Typography>
          ))}
        </Grid>
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
                <Grid item xs={4} key={item.id}>
                  <FormControlLabel
                    className={styles.label}
                    value={item.label}
                    label={item.label}
                    control={<Radio />}
                  />
                </Grid>
              );
            })}
          </RadioGroup>
          {data.map(({ id, label, variant, question, xs }) => (
            <Grid item xs={xs} key={id} className={styles.input}>
              <Typography variant={variant}>
                {label} {question}
              </Typography>
            </Grid>
          ))}
        </FormControl>
      </Grid>
    </Box>
  );
};

export default SignUp;
