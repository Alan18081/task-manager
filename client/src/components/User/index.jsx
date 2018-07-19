import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Typography
} from "@material-ui/core";
import { Icon } from "react-icons-kit";
import { user as userIcon } from "react-icons-kit/icomoon/user";

import styles from "./styles";

const User = ({ user, classes }) => (
  <Link to={`/users/${user.get("_id")}/chat`} className={classes.container}>
    <ListItem button>
      <ListItemIcon className={classes.icon}>
        <Icon icon={userIcon} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="subheading">{user.get("name")}</Typography>
      </ListItemText>
    </ListItem>
  </Link>
);

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(User);
