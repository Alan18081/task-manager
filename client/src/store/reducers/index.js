import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import user from "./user";
import tasks from "./tasks";
import chat from "./chat";
import serverError from "./serverError";
import socket from "./socket";
import users from "./users";

export default combineReducers({
  user,
  users,
  tasks,
  chat,
  serverError,
  socket,
  form
});
