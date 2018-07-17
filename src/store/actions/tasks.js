import {
  SET_TASK_TIME,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_SUCCESS,
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_ACTIVE_TASK,
  FETCH_ACTIVE_TASK_SUCCESS,
  ADD_TASK_COMMENT
} from "./types";

export const fetchTasks = () => ({
  type: FETCH_TASKS
});

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks
});

export const changeTaskStatus = (id, status) => ({
  type: CHANGE_TASK_STATUS,
  payload: {
    id,
    status
  }
});

export const changeTaskSuccess = task => ({
  type: CHANGE_TASK_SUCCESS,
  payload: task
});

export const setTaskTime = time => ({
  type: SET_TASK_TIME,
  payload: time
});

export const fetchActiveTask = id => ({
  type: FETCH_ACTIVE_TASK,
  payload: id
});

export const fetchActiveTaskSuccess = task => ({
  type: FETCH_ACTIVE_TASK_SUCCESS,
  payload: task
});

export const addTaskComment = (id, comment) => ({
  type: ADD_TASK_COMMENT,
  payload: {
    id,
    comment
  }
});
