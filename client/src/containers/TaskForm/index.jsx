import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field } from "redux-form";
import {
  Button,
  CircularProgress,
  withStyles,
  Typography
} from "@material-ui/core";

import Input from "../../components/Input";
import FormCard from "../../components/FormCard";
import UsersSelect from "../../components/UsersSelect";

import styles from "./styles";

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(values) {
    this.props.submit(values);
  }

  renderUsersSelect() {
    const { users } = this.props;
    if (users) {
      return <Field name="performer" component={UsersSelect} users={users} />;
    } else {
      return (
        <div>
          <CircularProgress />
          <Typography color="primary">Loading possible performers</Typography>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <FormCard title="New task">
        <form onSubmit={handleSubmit(this.submitHandler)}>
          <Field name="title" label="Title" component={Input} />
          <Field name="description" label="Description" component={Input} />
          <Field
            name="estimateTime"
            label="Approximate time of performing"
            component={Input}
          />
          {this.renderUsersSelect()}
          <div className={classes.btns}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.mainBtn}
            >
              Save
            </Button>
            <Link to="/tasks">
              <Button variant="outlined" color="secondary" fullWidth>
                Back to tasks
              </Button>
            </Link>
          </div>
        </form>
      </FormCard>
    );
  }
}

export default withStyles(styles)(TaskForm);
