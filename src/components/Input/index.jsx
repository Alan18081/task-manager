import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

const Input = ({
  input,
  meta: { touched, error },
  Icon,
  label,
  className,
  multiline
}) => (
  <TextField
    className={className}
    fullWidth
    placeholder={label}
    helperText={touched && error}
    error={error && touched}
    multiline={multiline}
    InputProps={{
      startAdornment: Icon && (
        <InputAdornment position="start">
          <Icon />
        </InputAdornment>
      )
    }}
    {...input}
  />
);

export default Input;
