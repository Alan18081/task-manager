import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles, IconButton } from "@material-ui/core";

import styles from "./styles";

const Logo = ({ classes }) => (
  <NavLink to="/">
    <IconButton variant="outlined">
      <img src="/logo.svg" className={classes.icon}/>
    </IconButton>
  </NavLink>
);

export default withStyles(styles)(Logo);
