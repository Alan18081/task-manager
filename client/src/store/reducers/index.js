import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import user from "./user";
import tasks from "./tasks";
import chat from "./chat";
import serverError from "./serverError";
import socket from "./socket";
import users from "./users";
import messages from "./messages";

export default combineReducers({
  user,
  users,
  tasks,
  chat,
  serverError,
  socket,
  messages,
  form
});
