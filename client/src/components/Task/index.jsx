import React from "react";
import { Link } from "react-router-dom";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core";
import { trashO } from "react-icons-kit/fa/trashO";
import { Icon } from "react-icons-kit";

import styles from "./styles";

const Task = ({ classes, task, remove, isAdmin }) => (
  <Link className={classes.container} to={`/tasks/${task.get("_id")}`}>
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Typography variant="headline">{task.get("title")}</Typography>
          <Typography variant="body1">{task.get("description")}</Typography>
        </div>
        {isAdmin && (
          <IconButton onClick={remove} color="secondary">
            <Icon icon={trashO} size={20} />
          </IconButton>
        )}
      </CardContent>
    </Card>
  </Link>
);

export default withStyles(styles)(Task);
