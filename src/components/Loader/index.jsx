import React from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';

import styles from './styles';

const Loader = ({ classes }) => (
  <CircularProgress className={classes.loader} />
);

export default withStyles(styles)(Loader);
