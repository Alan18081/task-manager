import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles, Card, CardContent, Typography } from "@material-ui/core";

import styles from "./styles";

class Task extends Component {
  render() {
    const { classes, task} = this.props;
    return (
      <Link className={classes.container} to={`/tasks/${task.get("id")}`}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline">{task.get("title")}</Typography>
            <Typography variant="body1">{task.get("description")}</Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
}

export default withStyles(styles)(Task);
