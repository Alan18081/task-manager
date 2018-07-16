import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

import Header from '../Header/index';
import Profile from '../Profile/index';
import Tasks from '../Tasks/index';

import styles from './styles';

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <Header/>
        <main className={classes.content}>
            <Route path="/profile" component={Profile}/>
            <Route path="/tasks" component={Tasks}/>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
