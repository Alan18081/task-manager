import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles, Card, CardContent } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { ic_mode_edit } from "react-icons-kit/md/ic_mode_edit";
import StarIcon from "@material-ui/icons/StarBorder";
import { Icon } from "react-icons-kit";

import styles from "./styles";

import Title from "../Title/index";

const ProfileView = ({ user, classes, toggle }) => (
  <div className={classes.container}>
    <Title
      title="Profile"
      Icon={() => <Icon icon={ic_mode_edit} />}
      clicked={toggle}
    />
    <Card>
      <CardContent className={classes.content}>
        <div className={classes.info}>
          <Typography variant="headline">{user.get("name")}</Typography>
          <Typography variant="subheading" color="primary">
            {user.get("email")}
          </Typography>
          <Typography variant="subheading">{user.get("birth")}</Typography>
        </div>
        {user.get("isAdmin") && (
          <div className={classes.status}>
            <StarIcon color="primary" className={classes.statusIcon} />
            <Typography color="primary">Admin</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default withStyles(styles)(ProfileView);
