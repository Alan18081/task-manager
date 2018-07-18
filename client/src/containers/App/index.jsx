import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import Header from "../Header/index";
import Profile from "../Profile/index";
import Tasks from "../Tasks/index";
import Loader from "../../components/Loader/index";
import TaskPage from "../TaskPage/index";
import Board from "../Board/index";
import Chat from "../Chat/index";
import Login from "../Login";
import Register from "../Register";
import Logout from "../Logout";
import TaskCreate from "../TaskCreate";

import styles from "./styles";
import { fetchTasks, fetchUser } from "../../store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onFetchUser();
    this.props.onFetchTasks();
  }

  renderRoutes() {
    const { user } = this.props;
    if (user) {
      return (
        <Fragment>
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/tasks/:id" component={TaskPage} />
          <Route path="/users/:userId/chat" component={Chat} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Fragment>
      );
    }
  }

  render() {
    const { classes, user, tasks } = this.props;
    if (!user || !tasks) {
      return <Loader />;
    }
    return (
      <Fragment>
        <Header user={user} />
        <main className={classes.content}>
          <Route path="/" exact component={Board} />
          {user.get("isAdmin") && (
            <Route path="/create_task" component={TaskCreate} />
          )}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, tasks }) => ({
  user: user.get("profile"),
  tasks: tasks.get("list")
});

const mapDispatchToProps = dispatch => ({
  onFetchUser: () => dispatch(fetchUser()),
  onFetchTasks: () => dispatch(fetchTasks())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(App))
);
