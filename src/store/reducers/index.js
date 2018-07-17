import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import user from "./user";
import tasks from "./tasks";
import board from "./board";

export default combineReducers({
  user,
  tasks,
  board,
  form
});
