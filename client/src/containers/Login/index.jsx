import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  Button,
  withStyles,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import { login as loginAction } from "../../store/actions";
import { validateLogin } from "../../utils/validate";

import styles from "./styles";

import Input from "../../components/Input";
import FormCard from "../../components/FormCard";

class Login extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler({ login, password }) {
    this.props.onLogin(login, password);
  }

  renderErrors() {
    const { errors } = this.props;
    if (errors.size) {
      return (
        <List>
          {errors.map(error => (
            <ListItem key={error.get("message")}>
              <Typography color="error">{error.get("message")}</Typography>
            </ListItem>
          ))}
        </List>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <FormCard title="Login">
        <form onSubmit={handleSubmit(this.submitHandler)}>
          <Field name="login" component={Input} label="Login" />
          <Field
            name="password"
            type="password"
            component={Input}
            label="Password"
          />
          {this.renderErrors()}
          <div className={classes.btns}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.mainBtn}
            >
              Sign In
            </Button>
            <Link to="/register">
              <Button variant="outlined" color="secondary" fullWidth>
                Create account
              </Button>
            </Link>
          </div>
        </form>
      </FormCard>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loading: user.get("loginLoading"),
  errors: user.get("loginErrors")
});

const mapDispatchToProps = dispatch => ({
  onLogin: (loginField, password) => dispatch(loginAction(loginField, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "login",
    validate: validateLogin
  })(withStyles(styles)(Login))
);
