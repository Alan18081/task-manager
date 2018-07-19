import React from "react";
import { TextField, InputAdornment, withStyles } from "@material-ui/core";

import styles from "./styles";

const Input = ({
  input,
  meta: { touched, error },
  Icon,
  label,
  classes,
  className,
  multiline,
  type
}) => (
  <TextField
    type={type}
    fullWidth
    className={[classes.input, className].join(" ")}
    label={label}
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

export default withStyles(styles)(Input);
