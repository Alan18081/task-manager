import React from 'react';
import {connect} from 'react-redux';
import {Card,CardContent,Typography,Button,withStyles} from '@material-ui/core';
import {Icon} from 'react-icons-kit';
import {ic_find_in_page} from 'react-icons-kit/md/ic_find_in_page'

import styles from './styles';

const PageNotFound = ({classes}) => (
  <Card className={classes.container}>
    <CardContent>
      <Typography variant="title" className={classes.title} align="center">
        Page not found
      </Typography>
      <Icon icon={ic_find_in_page} size={50} className={classes.icon}/>
    </CardContent>
  </Card>
);

export default withStyles(styles)(PageNotFound);