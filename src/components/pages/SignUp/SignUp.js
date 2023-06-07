import {
  FormControl,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import Logo from "../../Logo/Logo";
import { dataHeader, dataTextField, data, radioGroup } from "./data";
import { useState } from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, child, set } from "firebase/database";
import auth from "../../firebase";
import { database } from "../../firebase";
import TextFieldInput from "../../Form/TextFieldInput ";
import { Link, useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPostKey = push(child(ref(database), "posts")).key;
    const userDatabase = {
      fName: selectedValue.fName,
      lName: selectedValue.lName,
      email: selectedValue.email,
      password: selectedValue.password,
      selectedMonth: selectedValue.selectedMonth,
      selectedDay: selectedValue.selectedDay,
      selectedYear: selectedValue.selectedYear,
      gender: selectedValue.gender,
    };

    try {
      await createUserWithEmailAndPassword(
        auth,
        selectedValue.email,
        selectedValue.password
      );
      set(ref(database, "users/" + newPostKey), userDatabase);
      history("/");
    } catch (error) {
      let message = error.message;
      let code = error.code;
      if (code === "auth/email-already-in-use") {
        message = "The email you entered is already use.";
        setError(message);
      } else if (code === "auth/weak-password") {
        message = "Password should be at least 6 characters ";
        setError(message);
      } else if (code === "auth/missing-password") {
        message = "Enter the password.";
        setError(message);
      }
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
          <RadioGroup
            onChange={(e) =>
              setSelectedValue({
                ...selectedValue,
                gender: e.target.value,
              })
            }
          >
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
          {data.map(({ id, label, variant, question, xs, isAccount }) => (
            <Grid item xs={xs} key={id} className={styles.input}>
              <Typography variant={variant}>
                {isAccount ? (
                  <Link to="/">{label}</Link>
                ) : (
                  <>
                    {label} {question}
                  </>
                )}
              </Typography>
            </Grid>
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
      </Grid>
    </Box>
  );
};

export default SignUp;
