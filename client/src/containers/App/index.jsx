import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";

import Header from "../Header/index";
import Profile from "../Profile/index";
import Tasks from "../Tasks/index";
import Loader from "../../components/Loader/index";
import TaskPage from "../TaskPage/index";
import Board from "../Board/index";
import Chat from "../Chat/index";
import Login from "../Login";
import Register from "../Register";
import TaskForm from "../../components/TaskForm";
import PageNotFound from "../../components/PageNotFound";
import ServerError from "../../components/ServerError";

import TaskCreate from "../../hoc/TaskCreate";
import TaskEdit from "../../hoc/TaskEdit";

import styles from "./styles";
import { fetchLoggedUser } from "../../store/actions";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 400
    }
  }
});

class App extends Component {
  componentDidMount() {
    this.props.onFetchLoggedUser();
  }

  renderRoutes() {
    const { user } = this.props;
    if (user) {
      return (
        <Fragment>
          <Route path="/" exact component={Board} />
          <Route path="/profile" component={Profile} />
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/tasks/:id" exact component={TaskPage} />
          <Route path="/users/:userId/chat" component={Chat} />
          {user.get("isAdmin") && (
            <Fragment>
              <Route path="/createTask" component={TaskCreate(TaskForm)} />
              <Route path="/tasks/:id/edit" component={TaskEdit(TaskForm)} />
            </Fragment>
          )}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Fragment>
    );
  }

  render() {
    const { classes, user } = this.props;
    if (user === null) {
      return <Loader />;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Header user={user} />
        <main className={classes.content}>
          <Switch>
            {this.renderRoutes()}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </main>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user, tasks, serverError, socket }) => ({
  user: user.get("profile"),
  tasks: tasks.get("list"),
  error: serverError.get("error"),
  socket
});

const mapDispatchToProps = dispatch => ({
  onFetchLoggedUser: () => dispatch(fetchLoggedUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(App))
);
