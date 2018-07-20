import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles, Button } from "@material-ui/core";
import { Icon } from "react-icons-kit";
import { basic_todolist_pen } from "react-icons-kit/linea/basic_todolist_pen";

import styles from "./styles";

const Logo = ({ classes }) => (
  <NavLink to="/">
    <Button variant="outlined">
      <Icon className={classes.icon} icon={basic_todolist_pen} size={30} />
    </Button>
  </NavLink>
);

export default withStyles(styles)(Logo);
