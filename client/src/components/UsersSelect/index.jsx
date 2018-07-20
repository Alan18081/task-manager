import React from "react";
import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles";

const UsersSelect = ({ users, classes, input: { onChange, value } }) => (
  <FormControl className={classes.select}>
    <Typography>Your performer</Typography>
    <Select
      value={value ? value._id : ""}
      onChange={event => onChange(event.target.value)}
      inputProps={{
        id: "age-simple"
      }}
    >
      <MenuItem value="">No performer</MenuItem>
      {users.map(user => (
        <MenuItem value={user.get("_id")} key={user.get("_id")}>
          {user.get("name")}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

UsersSelect.propTypes = {
  users: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersSelect);
