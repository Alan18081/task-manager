import { fromJS } from "immutable";
import {
  FETCH_ALL_TASKS_SUCCESS,
  FETCH_ALL_USERS_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  tasks: null,
  users: null
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_TASKS_SUCCESS:
      return state.set("tasks", fromJS(payload));
    case FETCH_ALL_USERS_SUCCESS:
      return state.set("users", fromJS(payload));
    default:
      return state;
  }
};
