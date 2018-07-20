import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, withStyles } from "@material-ui/core";

import { logout } from "../../store/actions";

import styles from "./styles";

import Logo from "../../components/Logo";
import Navigation from "../../components/Navigation";

class Header extends Component {
  componentDidUpdate(newProps) {
    const { user, history } = this.props;
    if (!newProps.user && user) {
      history.replace("/login");
    }
  }

  render() {
    const { classes, user, isAdmin } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Logo />
            <Navigation isAdmin={isAdmin} user={user} />
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
