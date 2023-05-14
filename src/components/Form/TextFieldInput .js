import {
  Box,
  FormControlLabel,
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import styles from "../SignUp/Signup.module.css";

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
  ...rest
}) => {
  return (
    <Box className={styles.input} key={id}>
      <RadioGroup value={value} onChange={onChange}>
        {isRadio && (
          <FormControlLabel
            className={styles.label}
            value={label}
            label={label}
            control={<Radio />}
          />
        )}
      </RadioGroup>
      <TextField
        placeholder={placeholder}
        size="small"
        margin="dense"
        fullWidth={fullWidth}
        type={type}
        select={isSelect ? true : false}
        value={value}
        onChange={onChange}
        name={rest.name}
      >
        {isSelect &&
          option.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default TextFieldInput;
