import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  withStyles
} from "@material-ui/core";

import Input from "../../components/Input";
import FormCard from "../../components/FormCard";

import { createTask, fetchAllUsers } from "../../store/actions";
import { validateCreateTask } from "../../utils/validate";
import { getPerformers } from "../../selectors";

import styles from "./styles";

const selector = formValueSelector("createTask");

class TaskCreate extends Component {
  componentDidMount() {
    this.props.onFetchAllUsers();
  }
  submitHandler({ title, description, estimateTime }) {
    this.props.onCreateTask(title, description, estimateTime);
  }
  renderUsersSelect() {
    const { users, classes, change } = this.props;
    if (users) {
      return (
        <FormControl className={classes.select}>
          <Typography>Your performer</Typography>
          <Select
            value={this.props.performerId}
            onChange={({ target: { value } }) => change("performerId", value)}
            inputProps={{
              id: "age-simple"
            }}
          >
            <MenuItem value="">No performer</MenuItem>
            {users.map(user => (
              <MenuItem value={user.get("id")} key={user.get("id")}>
                {user.get("name")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
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

const mapStateToProps = state => ({
  users: getPerformers(state),
  performerId: selector(state, "performerId")
});

const mapDispatchToProps = dispatch => ({
  onCreateTask: (title, description, estimateTime) =>
    dispatch(createTask(title, description, estimateTime)),
  onFetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "createTask",
    validate: validateCreateTask,
    destroyOnUnmount: false
  })(withStyles(styles)(TaskCreate))
);
