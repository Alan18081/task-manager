import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader/index";
import Task from "../../components/Task/index";

import { removeTask } from "../../store/actions";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
    this.removeTaskHandler = this.removeTaskHandler.bind(this);
  }

  createTask() {
    this.props.history.push("/create_task");
  }

  removeTaskHandler(event, id) {
    event.stopPropagation();
    this.props.onRemoveTask(id);
  }

  renderTasks() {
    const { tasks, isAdmin } = this.props;
    return tasks.map(task => (
      <Task
        isAdmin={isAdmin}
        task={task}
        key={task.get("_id")}
        remove={event => this.removeTaskHandler(event, "_id")}
      />
    ));
  }

  render() {
    const { tasks } = this.props;
    if (!tasks) {
      return <Loader />;
    }
    return <div>{this.renderTasks()}</div>;
  }
}

const mapStateToProps = ({ tasks, user }) => ({
  tasks: tasks.get("list"),
  isAdmin: user.get("isAdmin")
});

const mapDispatchToProps = dispatch => ({
  onRemoveTask: id => dispatch(removeTask(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
