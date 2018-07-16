import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Typography,withStyles,Button} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

import styles from './styles';

class Header extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Link to="/" className={classes.brand}>
                            <Button>
                                <Typography variant="title" className={classes.title}>
                                    ./TaskManager
                                </Typography>
                            </Button>
                        </Link>
                        <Link to="/profile">
                            <IconButton>
                                <AccountIcon className={classes.profileBtn}/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
