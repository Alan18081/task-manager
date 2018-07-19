import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
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
import { basic_todolist_pen } from "react-icons-kit/linea/basic_todolist_pen";
import { enter } from "react-icons-kit/icomoon/enter";
import { userPlus } from "react-icons-kit/icomoon/userPlus";
import { exit } from "react-icons-kit/icomoon/exit";
import { plus } from "react-icons-kit/entypo/plus";
import { menu } from "react-icons-kit/entypo/menu";
import { Icon } from "react-icons-kit";

import { logout } from "../../store/actions";

import styles from "./styles";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
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
        <IconButton onClick={this.handleMenu} color="inherit">
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
    const { classes, user, onLogout } = this.props;
    let links = (
      <div>
        <NavLink to="/login">
          <Button>
            <Icon className={classes.icon} a icon={enter} size={20} />
            <Typography className={classes.linkText} variant="subheading">
              Sign In
            </Typography>
          </Button>
        </NavLink>
        <NavLink to="/register">
          <Button>
            <Icon className={classes.icon} icon={userPlus} size={20} />
            <Typography className={classes.linkText} variant="subheading">
              Sign Up
            </Typography>
          </Button>
        </NavLink>
      </div>
    );
    if (user) {
      links = (
        <div>
          <NavLink to="/tasks">
            <Button>
              <Icon icon={listAlt} size={20} className={classes.icon} />
              <Typography className={classes.linkText} variant="subheading">
                My tasks
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/profile">
            <Button>
              <Icon icon={addressBookO} size={20} className={classes.icon} />
              <Typography className={classes.linkText} variant="subheading">
                Profile
              </Typography>
            </Button>
          </NavLink>
          <NavLink to="/create_task">
            <Button variant="contained" color="secondary">
              <Icon icon={plus} size={20} className={classes.icon} />
              <Typography className={classes.linkText} variant="subheading">
                New task
              </Typography>
            </Button>
          </NavLink>
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
            <NavLink to="/" className={classes.brand}>
              <Button>
                <Icon
                  icon={basic_todolist_pen}
                  size={30}
                  className={classes.icon}
                />
              </Button>
            </NavLink>
            <Media query="(max-width: 768px)">
              {match => (match ? this.renderMobileMenu() : this.renderLinks())}
            </Media>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.get("profile")
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Header)));
