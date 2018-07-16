import React from 'react';
import PropTypes from 'prop-types';
import {Typography,withStyles,Card,CardContent,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/StarBorder';

import styles from './styles';

const ProfileView = ({user,classes,toggle}) => (
    <div className={classes.container}>
        <div className={classes.header}>
            <Typography variant="display1">Profile</Typography>
            <IconButton onClick={toggle} color="primary">
                <EditIcon/>
            </IconButton>
        </div>
        <Card>
            <CardContent className={classes.content}>
                <div className={classes.info}>
                    <Typography variant="headline">{user.get('name')}</Typography>
                    <Typography variant="subheading" color="primary">{user.get('email')}</Typography>
                    <Typography variant="subheading">{user.get('birth')}</Typography>
                </div>
                {user.get('isAdmin') && <div className={classes.status}>
                    <StarIcon color="primary" className={classes.statusIcon}/>
                    <Typography color="primary">Admin</Typography>
                </div>}
            </CardContent>
        </Card>
    </div>
);

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default withStyles(styles)(ProfileView);

