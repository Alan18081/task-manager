import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core";
import { trashO } from "react-icons-kit/fa/trashO";
import { ic_mode_edit } from "react-icons-kit/md/ic_mode_edit";
import { Icon } from "react-icons-kit";

import User from '../../components/User/index';


import styles from "./styles";

const Task = ({ classes, task, remove, isAdmin }) => (
    <Card className={classes.container}>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Link to={`/tasks/${task.get("_id")}`}>
            <Typography variant="headline">{task.get("title")}</Typography>
            <Typography variant="body1">{task.get("description")}</Typography>
          </Link>
          <div className={classes.performer}>
            <Typography variant="subheading" color="primary">Performer</Typography>
            <Link to={`/users/${task.get("performer").get("_id")}/chat`}>
              <User user={task.get("performer")}/>
            </Link>
          </div>
        </div>
        {isAdmin && (
          <div className={classes.controls}>
            <Link to={`/tasks/${task.get("_id")}/edit`}>
              <IconButton color="primary">
                <Icon icon={ic_mode_edit} size={20} />
              </IconButton>
            </Link>
            <IconButton onClick={remove} color="secondary">
              <Icon icon={trashO} size={20} />
            </IconButton>
          </div>
          )}
      </CardContent>
    </Card>
);

export default withStyles(styles)(Task);
