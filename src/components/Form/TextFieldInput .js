import {
  Box,
  FormControlLabel,
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import styles from "../pages/SignUp/Signup.module.css";

const TextFieldInput = ({
  id,
  placeholder,
  fullWidth,
  type,
  isSelect,
  option,
  value,
  gender,
  onChange,
  isRadio,
  label,
  name,
  ...rest
}) => {
  return (
    <Box key={id}>
      {isRadio ? (
        <RadioGroup value={value} onChange={onChange}>
          <FormControlLabel
            className={styles.label}
            value={label}
            label={label}
            control={<Radio />}
          />
        </RadioGroup>
      ) : (
        <TextField
          placeholder={placeholder}
          size="small"
          margin="dense"
          fullWidth={fullWidth}
          type={type}
          select={isSelect ? true : false}
          value={value}
          onChange={onChange}
          name={name}
        >
          {isSelect &&
            option.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    </Box>
  );
};

export default TextFieldInput;
