import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Typography,
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Icon } from "react-icons-kit";

import styles from "./styles";

const NavItem = ({ to, classes, children, icon, mobile, important }) => (
  <NavLink to={to}>
    {mobile ? (
      <ListItem button>
        <ListItemIcon>
          <Icon icon={icon} size={15} />
        </ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItem>
    ) : (
      <Button
        variant={important && "contained"}
        color={important && "secondary"}
      >
        <Icon icon={icon} size={20} className={classes.icon} />
        <Typography className={classes.text} variant="subheading">
          {children}
        </Typography>
      </Button>
    )}
  </NavLink>
);

NavItem.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
};

export default withStyles(styles)(NavItem);
