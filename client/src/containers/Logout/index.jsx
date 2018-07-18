import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions";

import Loader from "../../components/Loader";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    const { user } = this.props;
    if (user) {
      return <Loader />;
    }
    return <Redirect to="/login" />;
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
)(Logout);
