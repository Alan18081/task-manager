import { fromJS } from "immutable";
import {
  CHANGE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  FETCH_ACTIVE_TASK_SUCCESS,
  FETCH_USER_TASKS_SUCCESS,
  REMOVE_TASK_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  list: null,
  activeTask: null
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_TASKS_SUCCESS:
      return state.set("list", fromJS(payload));
    case FETCH_ACTIVE_TASK_SUCCESS:
      return state.set("activeTask", fromJS(payload));
    case CHANGE_TASK_SUCCESS:
      console.log(payload);
      return state.update("list", tasks =>
        tasks.update(
          tasks.findIndex(task => task.get("_id") === payload.id),
          () => fromJS(payload)
        )
      );
    case CREATE_TASK_SUCCESS:
      return state.update("list", tasks => tasks.push(fromJS(payload)));
    case REMOVE_TASK_SUCCESS:
      return state.update("list", tasks =>
        tasks.filter(task => task.get("_id") !== payload)
      );
    default:
      return state;
  }
};
