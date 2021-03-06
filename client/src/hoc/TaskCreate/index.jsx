import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { createTask, fetchAllUsers } from "../../store/actions";
import { getPerformers } from "../../selectors";
import { validateTask } from "../../utils/validate";

export default WrappedComponent => {
  class TaskCreate extends Component {
    constructor(props) {
      super(props);
      this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
      const { onFetchAllUsers, history, isAdmin } = this.props;
      if (!isAdmin) {
        history.replace("/tasks");
      } else {
        onFetchAllUsers();
      }
    }

    submitHandler(info) {
      const { onCreateTask } = this.props;
      onCreateTask(info);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          title="New task"
          submit={this.submitHandler}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    users: getPerformers(state),
    isAdmin: state.user.get("isAdmin")
  });

  const mapDispatchToProps = dispatch => ({
    onCreateTask: task => dispatch(createTask(task)),
    onFetchAllUsers: () => dispatch(fetchAllUsers())
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: "createTask",
      validate: validateTask
    })(TaskCreate)
  );
};
