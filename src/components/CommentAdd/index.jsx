import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withStyles, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { validateComment } from "../../utils/validate";
import PropTypes from "prop-types";

import styles from "./styles";

import Input from "../Input/index";

class CommentAdd extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, handleSubmit, submitHandler } = this.props;
    return (
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.container}
      >
        <Field
          name="text"
          className={classes.field}
          multiline
          component={Input}
          label="Your comment"
        />
        <IconButton type="submit" color="secondary" className={classes.btn}>
          <SendIcon />
        </IconButton>
      </form>
    );
  }
}

CommentAdd.propTypes = {
  submit: PropTypes.func.isRequired
};

export default reduxForm({
  form: "addComment",
  validate: validateComment
})(withStyles(styles)(CommentAdd));
