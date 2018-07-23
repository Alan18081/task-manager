import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withStyles, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { validateMessage } from "../../utils/validate";
import PropTypes from "prop-types";

import styles from "./styles";

import Input from "../Input/index";

class MessageAdd extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { submitHandler, reset } = this.props;
    submitHandler(values);
    reset();
  }

  render() {
    const { classes, handleSubmit, label } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)} className={classes.container}>
        <Field
          ref={this.input}
          name="text"
          className={classes.field}
          multiline
          component={Input}
          label={label}
        />
        <IconButton type="submit" color="secondary" className={classes.btn}>
          <SendIcon />
        </IconButton>
      </form>
    );
  }
}

MessageAdd.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default reduxForm({
  form: "addMessage",
  validate: validateMessage
})(withStyles(styles)(MessageAdd));
