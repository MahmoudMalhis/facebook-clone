import { FormControl, Box, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import { dataHeader, dataTextField, data } from "./data";
import { useState } from "react";
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import TextFieldInput from "../Form/TextFieldInput ";

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

// import React, { useState } from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import RadioGroup from "@mui/material/RadioGroup";
// import Radio from "@mui/material/Radio";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";

// // const useStyles = makeStyles((theme) => ({
// //   form: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     marginTop: theme.spacing(4),
// //   },
// //   input: {
// //     margin: theme.spacing(1),
// //   },
// //   radioGroup: {
// //     flexDirection: "row",
// //   },
// //   submitButton: {
// //     marginTop: theme.spacing(2),
// //   },
// // }));

// const SignupForm = () => {
//   // useStyles();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add code to handle form submission here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="First Name"
//         value={firstName}
//         onChange={(event) => setFirstName(event.target.value)}
//       />
//       <TextField
//         label="Last Name"
//         value={lastName}
//         onChange={(event) => setLastName(event.target.value)}
//       />
//       <TextField
//         label="Email"
//         type="email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <TextField
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <TextField
//         label="Birthday"
//         type="date"
//         value={birthday}
//         onChange={(event) => setBirthday(event.target.value)}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <FormControl>
//         <FormLabel>Gender</FormLabel>
//         <RadioGroup value={gender} onChange={handleGenderChange}>
//           <FormControlLabel value="male" control={<Radio />} label="Male" />
//           <FormControlLabel value="female" control={<Radio />} label="Female" />
//           <FormControlLabel
//             value="nonbinary"
//             control={<Radio />}
//             label="Non-binary"
//           />
//         </RadioGroup>
//       </FormControl>
//       <FormControl>
//         <FormLabel>Select your gender</FormLabel>
//         <Select
//           value={gender}
//           onChange={(event) => setGender(event.target.value)}
//         >
//         </Select>
//       </FormControl>
//       <Button variant="contained" color="primary" type="submit">
//         Sign Up
//       </Button>
//     </form>
//   );
// };

// export default SignupForm;
