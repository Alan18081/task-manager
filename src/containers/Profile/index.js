import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProfile} from '../../store/actions';
import {withStyles} from '@material-ui/core';

import ProfileView from '../../components/ProfileView';
import ProfileEdit from '../../components/ProfileEdit';

import styles from './styles';

class Profile extends Component {
    state = {
      editing: false
    };
    toggleEditing = () => {
      this.setState({
         editing: !this.state.editing
      });
    };
    save = (profile) => {
        this.props.onUpdateProfile(profile);
        this.toggleEditing();
    };
    render() {
        const {user,classes} = this.props;
        return (
            <div className={classes.container}>
                {this.state.editing
                    ? <ProfileEdit toggle={this.toggleEditing} initialValues={user.toJS()} onSave={this.save}/>
                    : <ProfileView user={user} toggle={this.toggleEditing}/>}
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
   user: user.get('profile')
});

const mapDispatchToProps = dispatch => ({
   onUpdateProfile: (profile) => dispatch(updateProfile(profile))
});


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Profile));
