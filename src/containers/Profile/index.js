import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser,saveProfile} from '../../store/actions';
import {withStyles,CircularProgress} from '@material-ui/core';

import ProfileView from '../../components/ProfileView';
import ProfileEdit from '../../components/ProfileEdit';

import styles from './styles';

class Profile extends Component {
    state = {
      editing: false
    };
    componentDidMount() {
        this.props.onFetchUser();
    }
    toggleEditing = () => {
      this.setState({
         editing: !this.state.editing
      });
    };
    save = (profile) => {
        this.props.onSaveProfile(profile);
        this.toggleEditing();
    };
    render() {
        const {user,classes} = this.props;
        if(!user) {
            return <CircularProgress className={classes.loader}/>
        }
        return this.state.editing
            ? <ProfileEdit toggle={this.toggleEditing} initialValues={user.toJS()} onSave={this.save}/>
            : <ProfileView user={user} toggle={this.toggleEditing}/>;
    }
}

const mapStateToProps = ({user}) => ({
   user: user.get('profile'),
   loading: user.get('loading')
});

const mapDispatchToProps = dispatch => ({
   onFetchUser: () => dispatch(fetchUser()),
   onSaveProfile: (profile) => dispatch(saveProfile(profile))
});


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));
