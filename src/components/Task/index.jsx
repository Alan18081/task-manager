import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { withStyles, Card, CardContent, Typography } from "@material-ui/core";

import TaskTime from "../../containers/TaskTime/index";

import styles from "./styles";

class Task extends Component {
  render() {
    const { classes, task, isAdmin, change } = this.props;
    return (
      <Link className={classes.container} to={`/tasks/${task.get("id")}`}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline">{task.get("title")}</Typography>
            <Typography variant="body1">{task.get("description")}</Typography>
            {task.get("estimateTime") ? (
              <Typography color="secondary">
                {task.get("estimateTime")}
              </Typography>
            ) : (
              <TaskTime taskId={task.get("id")} />
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }
}

export default withStyles(styles)(Task);
