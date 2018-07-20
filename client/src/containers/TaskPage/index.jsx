import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Typography, withStyles } from "@material-ui/core";
import StatusIcon from "@material-ui/icons/Cached";
import { changeTask, fetchActiveTask } from "../../store/actions";
import styles from "./styles";

import TaskTime from "../TaskTime/index";
import Loader from "../../components/Loader/index";
import Comments from "../Comments/index";
import TaskStatus from "../../components/TaskStatus";

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.handleStatus = this.handleStatus.bind(this);
  }

  componentDidMount() {
    const { match, onFetchActiveTask } = this.props;
    onFetchActiveTask(match.params.id);
  }

  handleStatus({ target: { value } }) {
    const { task, onChangeTask } = this.props;
    onChangeTask(task.get("_id"), {
      status: value
    });
  }

  render() {
    const { task, classes, isAdmin } = this.props;
    if (!task) {
      return <Loader />;
    }
    return (
      <div>
        <Card className={classes.taskDescription}>
          <CardContent className={classes.content}>
            <div className={classes.info}>
              <Typography variant="display2">{task.get("title")}</Typography>
              <Typography variant="body1">{task.get("description")}</Typography>
              {task.get("estimateTime") ? (
                <Typography variant="subheading" color="secondary">
                  {task.get("estimateTime")}
                </Typography>
              ) : (
                <TaskTime taskId={task.get("_id")} />
              )}
              <TaskStatus
                change={this.handleStatus}
                status={task.get("status")}
                isAdmin={isAdmin}
              />
            </div>
            <div className={classes.status}>
              <StatusIcon color="primary" className={classes.statusIcon} />
              <Typography variant="subheading" color="primary">
                {task.get("estimateTime")
                  ? `${task.get("estimateTime")} in `
                  : ""}
                {task.get("status")}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Comments taskId={task.get("_id")} messages={task.get("messages")} />
      </div>
    );
  }
}

const mapStateToProps = ({ tasks, user }) => ({
  task: tasks.get("activeTask"),
  isAdmin: user.get("isAdmin")
});

const mapDispatchToProps = dispatch => ({
  onFetchActiveTask: id => dispatch(fetchActiveTask(id)),
  onChangeTask: (id, info) => dispatch(changeTask(id, info))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TaskPage));
