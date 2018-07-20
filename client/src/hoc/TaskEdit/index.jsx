import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchActiveTask,
  changeTask,
  fetchAllUsers
} from "../../store/actions";
import { reduxForm } from "redux-form";
import { getPerformers } from "../../selectors";
import { validateTask } from "../../utils/validate";

import Loader from "../../components/Loader";

export default WrappedComponent => {
  class TaskEdit extends Component {
    constructor(props) {
      super(props);

      this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
      const {
        onFetchActiveTask,
        onFetchAllUsers,
        history,
        match,
        isAdmin
      } = this.props;
      if (!isAdmin) {
        history.replace("/tasks");
      }
      onFetchActiveTask(match.params.id);
      onFetchAllUsers();
    }

    submitHandler(info) {
      const { onChangeTask, match } = this.props;
      onChangeTask(match.params.id, info);
    }

    render() {
      const { initialValues } = this.props;
      if (!initialValues) {
        return <Loader />;
      }
      return <WrappedComponent {...this.props} submit={this.submitHandler} />;
    }
  }

  const mapStateToProps = state => ({
    users: getPerformers(state),
    initialValues:
      state.tasks.get("activeTask") && state.tasks.get("activeTask").toJS(),
    isAdmin: state.user.get("isAdmin")
  });

  const mapDispatchToProps = dispatch => ({
    onFetchActiveTask: id => dispatch(fetchActiveTask(id)),
    onChangeTask: (id, task) => dispatch(changeTask(id, task)),
    onFetchAllUsers: () => dispatch(fetchAllUsers())
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: "editTask",
      validate: validateTask,
      enableReinitialize: true
    })(TaskEdit)
  );
};
