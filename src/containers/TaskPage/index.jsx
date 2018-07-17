import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { changeTaskStatus, fetchActiveTask } from "../../store/actions";
import StatusIcon from "@material-ui/icons/Cached";
import styles from "./styles";

import TaskTime from "../TaskTime/index";
import Loader from "../../components/Loader/index";
import Comments from "../Comments/index";

const stages = ["To Do", "In Progress", "Peer Review", "Done"];

class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.handleStatus = this.handleStatus.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onFetchActiveTask(id);
  }

  handleStatus({ target: { value } }) {
    this.props.onChangeTaskStatus(this.props.task.get("id"), value);
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
                <TaskTime taskId={task.get("id")} />
              )}
              <div className={classes.status}>
                {task.get("status") === stages[stages.length - 1] &&
                !isAdmin ? (
                  <Typography variant="subheading" color="primary">
                    {task.get("status")}
                  </Typography>
                ) : (
                  <FormControl>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                      value={task.get('status')}
                      onChange={this.handleStatus}
                      inputProps={{
                        id: "status"
                      }}
                    >
                      {stages.map(stage => {
                        if (stage === stages[stages.length - 1] && !isAdmin) {
                          return null;
                        }
                        return (
                          <MenuItem key={stage} value={stage}>
                            {stage}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              </div>
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
        <Comments taskId={task.get("id")} comments={task.get("comments")} />
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
  onChangeTaskStatus: (id, status) => dispatch(changeTaskStatus(id, status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TaskPage));
