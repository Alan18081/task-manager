import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader/index";
import Task from "../../components/Task/index";

class Tasks extends Component {
  renderTasks() {
    return this.props.tasks.map(task => (
      <Task isAdmin={this.props.isAdmin} task={task} key={task.get("id")} />
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

export default connect(
  mapStateToProps
)(Tasks);
