import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Drawer, List, withStyles } from "@material-ui/core";
import { users as usersIcon } from "react-icons-kit/icomoon/users";
import { Icon } from "react-icons-kit";

import { fetchAllTasks, fetchAllUsers } from "../../store/actions";
import {getOtherUsersList} from "../../selectors";

import styles from "./styles";

import Loader from "../../components/Loader";
import Task from "../../components/Task/index";
import User from "../../components/User/index";
import Title from "../../components/Title/index";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    const { onFetchAllTasks, onFetchAllUsers } = this.props;
    onFetchAllTasks();
    onFetchAllUsers();
  }

  toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  renderTasks() {
    const { tasks, isAdmin } = this.props;
    return tasks.map(task => (
      <Task key={task.get("_id")} task={task} isAdmin={isAdmin} />
    ));
  }

  renderUsers() {
    const { users } = this.props;
    return users.map(user => <User key={user.get("_id")} user={user} />);
  }

  render() {
    const { users, tasks, classes } = this.props;
    if (!users || !tasks) {
      return <Loader />;
    }
    return (
      <Fragment>
        <Drawer open={this.state.drawerOpened} onClose={this.toggleDrawer}>
          <List>{this.renderUsers()}</List>
        </Drawer>
        <Title
          title="Board"
          Icon={() => <Icon icon={usersIcon} />}
          clicked={this.toggleDrawer}
        />
        <div className={classes.tasks}>{this.renderTasks()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.get("list"),
  users: getOtherUsersList(state),
  isAdmin: state.user.get("isAdmin")
});

const mapDispatchToProps = dispatch => ({
  onFetchAllTasks: () => dispatch(fetchAllTasks()),
  onFetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Board));
