import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Media from "react-media";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  MenuItem,
  Menu,
  Button
} from "@material-ui/core";
import { addressBookO } from "react-icons-kit/fa/addressBookO";
import { listAlt } from "react-icons-kit/fa/listAlt";
import { enter } from "react-icons-kit/icomoon/enter";
import { userPlus } from "react-icons-kit/icomoon/userPlus";
import { exit } from "react-icons-kit/icomoon/exit";
import { plus } from "react-icons-kit/entypo/plus";
import { menu } from "react-icons-kit/entypo/menu";
import { Icon } from "react-icons-kit";

import { logout } from "../../store/actions";

import styles from "./styles";

import NavItem from "../../components/NavItem/index";
import Logo from "../../components/Logo";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
  }
  componentWillUpdate(newProps) {
    const { user, history } = this.props;
    if (!newProps.user && user) {
      history.replace("/login");
    }
  }

  handleMenu(event) {
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
        <IconButton onClick={event => this.handleMenu(event)} color="inherit">
          <Icon icon={menu} size={20} />
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
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      </div>
    );
  }
  renderLinks() {
    const { classes, user, onLogout, isAdmin } = this.props;
    let links = (
      <div>
        <NavItem to="/login" icon={enter}>
          Sign In
        </NavItem>
        <NavItem to="/register" icon={userPlus}>
          Sign Up
        </NavItem>
      </div>
    );
    if (user) {
      links = (
        <div>
          <NavItem to="/tasks" icon={listAlt}>
            My tasks
          </NavItem>
          <NavItem to="/profile" icon={addressBookO}>
            Profile
          </NavItem>
          {isAdmin && (
            <NavItem to="/createTask" icon={plus}>
              New task
            </NavItem>
          )}
          <IconButton onClick={onLogout}>
            <Icon icon={exit} size={20} className={classes.icon} />
          </IconButton>
        </div>
      );
    }
    return links;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Logo />
            <Media query="(max-width: 768px)">
              {match => (
                <div>{match ? this.handleMenu() : this.renderLinks()}</div>
              )}
            </Media>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.get("profile"),
  isAdmin: user.get("isAdmin")
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Header)));
