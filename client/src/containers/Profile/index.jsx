import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../store/actions";
import ProfileView from "../../components/ProfileView/index";
import ProfileEdit from "../../components/ProfileEdit/index";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.save = this.save.bind(this);
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
  }
  save(profile) {
    this.props.onUpdateProfile(profile);
    this.toggleEditing();
  }
  render() {
    const { user } = this.props;
    const { editing } = this.state;
    if (editing) {
      return (
        <ProfileEdit
          toggle={this.toggleEditing}
          initialValues={user.toJS()}
          onSave={this.save}
        />
      );
    }
    return <ProfileView user={user} toggle={this.toggleEditing} />;
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.get("profile")
});

const mapDispatchToProps = dispatch => ({
  onUpdateProfile: profile => dispatch(updateProfile(profile))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
