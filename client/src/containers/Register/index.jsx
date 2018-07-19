import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Button,
  withStyles,
  ListItem,
  List,
  Typography
} from "@material-ui/core";
import { register } from "../../store/actions";
import { validateRegister } from "../../utils/validate";

import styles from "./styles";

import Input from "../../components/Input";
import FormCard from "../../components/FormCard";

class Register extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler({ name, email, password }) {
    this.props.onRegister(name, email, password);
  }

  renderErrors() {
    const { errors, classes } = this.props;
    if (errors.size) {
      return (
        <List>
          {errors.map(error => (
            <ListItem key={error.get("message")} className={classes.error}>
              <Typography color="error">{error.get("message")}</Typography>
            </ListItem>
          ))}
        </List>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, classes, user } = this.props;
    if (user) {
      return <Redirect to="/profile" />;
    }
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
