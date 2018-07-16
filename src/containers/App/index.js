import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {Route,withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

import Header from '../Header/index';
import Profile from '../Profile/index';
import Tasks from '../Tasks/index';
import Loader from '../../components/Loader';

import styles from './styles';
import {fetchUser} from "../../store/actions";

class App extends Component {

    componentDidMount() {
        this.props.onFetchUser();
    }

    render() {
    const {classes,user} = this.props;
    if(!user) {
        return <Loader/>
    }
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

const mapStateToProps = ({user}) => ({
    user: user.get('profile')
});

const mapDispatchToProps = dispatch => ({
    onFetchUser: () => dispatch(fetchUser())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(App)));
