import React from "react";
import { withStyles, Card, CardContent, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import styles from "./styles";

const FormCard = ({ children, classes, title }) => (
  <div className={classes.container}>
    <Typography variant="display1" align="center">
      {title}
    </Typography>
    <Card className={classes.form}>
      <CardContent>{children}</CardContent>
    </Card>
  </div>
);

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(FormCard);
