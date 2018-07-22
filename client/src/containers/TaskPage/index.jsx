import React, { Component } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardContent, Typography, withStyles, Button } from "@material-ui/core";
import StatusIcon from "@material-ui/icons/Cached";
import { changeTask, sendTaskMessage, fetchActiveTask, resetActiveTask } from "../../store/actions";
import styles from "./styles";

import {getMessagesByTaskId} from "../../selectors";

import TaskTime from "../TaskTime/index";
import Loader from "../../components/Loader/index";
import Comments from "../Comments/index";
import TaskStatus from "../../components/TaskStatus";

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removed: false
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    const { match, onFetchActiveTask } = this.props;
    onFetchActiveTask(match.params.id);
  }

  componentWillUnmount() {
    this.props.onResetActiveTask();
  }

  static getDerivedStateFromProps({task}) {
    if(task === false) {
      return {
        removed: true
      }
    }
    return {
      removed: false
    }
  }

  handleStatus({ target: { value } }) {
    const { task, onChangeTask } = this.props;
    onChangeTask(task.get("_id"), {
      status: value
    });
  }

  addComment({text}) {
    const {onSendTaskMessage,task,currentUser} = this.props;
    onSendTaskMessage(task.get("_id"),{
      author: currentUser.get("_id"),
      text,
      createdAt: new Date()
    });
  }

  render() {
    const { task, classes, isAdmin, messages } = this.props;
    if(this.state.removed) {
      return (
        <Card className={classes.warning}>
          <CardContent className={classes.warningContainer}>
            <Typography variant="title" className={classes.warningText}>
              Task was removed or never existed at all
            </Typography>
            <Link to="/tasks">
              <Button variant="outlined" color="secondary">Tasks</Button>
            </Link>
          </CardContent>
        </Card>
      )
    }
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
        <Comments sendHandler={this.addComment} messages={messages} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  task: state.tasks.get("activeTask"),
  isAdmin: state.user.get("isAdmin"),
  messages: getMessagesByTaskId(state)
});

const mapDispatchToProps = dispatch => ({
  onFetchActiveTask: id => dispatch(fetchActiveTask(id)),
  onChangeTask: (id, info) => dispatch(changeTask(id, info)),
  onResetActiveTask: () => dispatch(resetActiveTask()),
  onSendTaskMessage: (id,message) => dispatch(sendTaskMessage(id,message))
 });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TaskPage));
