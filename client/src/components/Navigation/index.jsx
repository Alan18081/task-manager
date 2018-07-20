import React, { Component } from "react";
import Media from "react-media";
import PropTypes from "prop-types";
import {
  List,
  IconButton,
  Menu,
  withStyles,
  ListItemText,
  ListItemIcon,
  ListItem
} from "@material-ui/core";
import { Icon } from "react-icons-kit";
import { enter } from "react-icons-kit/icomoon/enter";
import { userPlus } from "react-icons-kit/icomoon/userPlus";
import { listAlt } from "react-icons-kit/fa/listAlt";
import { addressBookO } from "react-icons-kit/fa/addressBookO";
import { plus } from "react-icons-kit/entypo/plus";
import { exit } from "react-icons-kit/icomoon/exit";
import { menu } from "react-icons-kit/entypo/menu";

import styles from "./styles";

import NavItem from "../NavItem";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleMenuOpen(event) {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null
    });
  }

  renderMobileMenu() {
    return (
      <div>
        <IconButton onClick={this.handleMenuOpen} color="inherit">
          <Icon icon={menu} size={25} />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          <List>{this.renderLinks(true)}</List>
        </Menu>
      </div>
    );
  }

  renderLinks(mobile = false) {
    const { classes, user, logout, isAdmin } = this.props;
    let links = (
      <div>
        <NavItem to="/login" icon={enter} mobile={mobile}>
          Sign In
        </NavItem>
        <NavItem to="/register" icon={userPlus} mobile={mobile}>
          Sign Up
        </NavItem>
      </div>
    );
    if (user) {
      links = (
        <div>
          <NavItem to="/tasks" icon={listAlt} mobile={mobile}>
            My tasks
          </NavItem>
          <NavItem to="/profile" icon={addressBookO} mobile={mobile}>
            Profile
          </NavItem>
          {isAdmin && (
            <NavItem to="/createTask" icon={plus} mobile={mobile} important>
              New task
            </NavItem>
          )}
          {mobile ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <Icon icon={exit} size={20} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          ) : (
            <IconButton onClick={logout}>
              <Icon icon={exit} size={20} className={classes.icon} />
            </IconButton>
          )}
        </div>
      );
    }
    return links;
  }

  render() {
    return (
      <Media query="(max-width: 768px)">
        {match => (
          <div>{match ? this.renderMobileMenu() : this.renderLinks()}</div>
        )}
      </Media>
    );
  }
}

Navigation.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default withStyles(styles)(Navigation);
