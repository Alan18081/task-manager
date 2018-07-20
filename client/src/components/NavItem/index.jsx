import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Icon } from "react-icons-kit";

import styles from "./styles";

const NavItem = ({ to, classes, children, icon }) => (
  <NavLink to={to}>
    <Button color="inherit">
      <Icon icon={icon} size={20} className={classes.icon} />
      <Typography className={classes.text} variant="subheading">
        {children}
      </Typography>
    </Button>
  </NavLink>
);

NavItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired
};

export default withStyles(styles)(NavItem);
