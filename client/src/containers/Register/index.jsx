import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, withStyles, ListItem, List } from "@material-ui/core";
import { register } from "../../store/actions";
import { validateRegister } from "../../utils/validate";

import styles from "./styles";

import Input from "../../components/Input";
import FormCard from "../../components/FormCard";

class Register extends Component {
  componentWillUpdate(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.props.history.replace("/profile");
    }
  }
  renderErrors() {
    const { errors } = this.props;
    if (errors.size) {
      return (
        <List>
          {errors.map(error => (
            <ListItem key={error.get("message")}>
              {error.get("message")}
            </ListItem>
          ))}
        </List>
      );
    }
    return null;
  }

  submitHandler({ login, email, password }) {
    this.props.onRegister(login, email, password);
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <FormCard title="New account">
        <form onSubmit={handleSubmit(this.submitHandler)} noValidate>
          <Field name="name" component={Input} label="Name" />
          <Field name="email" type="email" component={Input} label="Email" />
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
          />
          <Field
            name="confirmPassword"
            type="password"
            component={Input}
            label="Confirm password"
          />
          {this.renderErrors()}
          <div className={classes.btns}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.mainBtn}
              type="submit"
            >
              Sign Up
            </Button>
            <Link to="/login">
              <Button variant="outlined" color="secondary" fullWidth>
                Login
              </Button>
            </Link>
          </div>
        </form>
      </FormCard>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.get("profile"),
  loading: user.get("registerLoading"),
  errors: user.get("registerErrors")
});

const mapDispatchToProps = dispatch => ({
  onRegister: (name, email, password) =>
    dispatch(register(name, email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "register",
    validate: validateRegister
  })(withStyles(styles)(Register))
);
