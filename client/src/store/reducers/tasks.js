import { fromJS } from "immutable";
import {
  CHANGE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  FETCH_ACTIVE_TASK_SUCCESS,
  FETCH_TASKS_SUCCESS,
  REMOVE_TASK_SUCCESS,
  FETCH_TASK_BY_ID_SUCCESS,
  RESET_ACTIVE_TASK
} from "../actions/types";

const initialState = fromJS({
  list: fromJS([]),
  activeTask: null
});

const removeTaskSuccess = (state,payload) => {
  if(!state.get("activeTask")) {
    return state.update("list", tasks =>
      tasks.filter(task => task.get("_id") !== payload));
  }
  return state.update("list", tasks =>
    tasks.filter(task => task.get("_id") !== payload)
  ).update("activeTask", task => task.get("_id") === payload ? false : task);
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASKS_SUCCESS:
      return state.update("list",
        tasks => tasks.concat(fromJS(payload)).groupBy(task => task.get("_id")).map(task => task.first()).toList()
      )
    case FETCH_TASK_BY_ID_SUCCESS:
      return state.update("list",
        tasks => tasks.push(fromJS(payload)).toSet().toList());
    case FETCH_ACTIVE_TASK_SUCCESS:
      return state.set("activeTask", fromJS(payload));
    case CHANGE_TASK_SUCCESS:
      return state.update("list", tasks =>
      tasks.update(
        tasks.findIndex(task => task.get("_id") === payload._id),
        () => fromJS(payload)
      )
    );
    case CREATE_TASK_SUCCESS:
      return state.update("list",
        tasks => tasks.push(fromJS(payload))
      );
    case REMOVE_TASK_SUCCESS:
      return removeTaskSuccess(state,payload);
    case RESET_ACTIVE_TASK:
      return state.set("activeTask",null);
    default:
      return state;
  }
};
