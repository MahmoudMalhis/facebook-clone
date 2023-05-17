import { Grid, MenuItem, TextField } from "@mui/material";

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
  xs,
  name,
}) => {
  return (
    <Grid item xs={xs}>
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
    </Grid>
  );
};

export default TextFieldInput;
