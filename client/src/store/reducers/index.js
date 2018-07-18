import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import user from "./user";
import tasks from "./tasks";
import board from "./board";
import chat from "./chat";

export default combineReducers({
  user,
  tasks,
  board,
  chat,
  form
});
