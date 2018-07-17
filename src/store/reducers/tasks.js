import { fromJS } from "immutable";
import {
  CHANGE_TASK_SUCCESS,
  FETCH_ACTIVE_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  list: null,
  activeTask: null
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS_SUCCESS:
      return state.set("list", fromJS(payload));
    case FETCH_ACTIVE_TASK_SUCCESS:
      return state.set("activeTask", fromJS(payload));
    case CHANGE_TASK_SUCCESS:
      return state.update("list", tasks =>
        tasks.update(
          tasks.findIndex(task => task.get("id") === payload.id),
          () => fromJS(payload)
        )
      );
    default:
      return state;
  }
};
