import {
  SET_TASK_TIME,
  CHANGE_TASK,
  CHANGE_TASK_SUCCESS,
  FETCH_ALL_TASKS,
  FETCH_USER_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_ACTIVE_TASK,
  FETCH_ACTIVE_TASK_SUCCESS,
  RESET_ACTIVE_TASK,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  CHANGE_TASK_STATUS
} from "./types";

export const fetchUserTasks = () => ({
  type: FETCH_USER_TASKS
});

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks
});

export const fetchAllTasks = () => ({
  type: FETCH_ALL_TASKS
});


export const changeTask = (id, info) => ({
  type: CHANGE_TASK,
  payload: {
    id,
    info
  }
});

export const changeTaskSuccess = task => ({
  type: CHANGE_TASK_SUCCESS,
  payload: task
});

export const setTaskTime = (id, time) => ({
  type: SET_TASK_TIME,
  payload: {
    id,
    time
  }
});

export const fetchActiveTask = id => ({
  type: FETCH_ACTIVE_TASK,
  payload: id
});

export const fetchActiveTaskSuccess = task => ({
  type: FETCH_ACTIVE_TASK_SUCCESS,
  payload: task
});

export const resetActiveTask = () => ({
  type: RESET_ACTIVE_TASK
});

export const createTask = task => ({
  type: CREATE_TASK,
  payload: task
});

export const createTaskSuccess = task => ({
  type: CREATE_TASK_SUCCESS,
  payload: task
});

export const removeTask = id => ({
  type: REMOVE_TASK,
  payload: id
});

export const removeTaskSuccess = id => ({
  type: REMOVE_TASK_SUCCESS,
  payload: id
});

export const changeTaskStatus = (id,status) => ({
  type: CHANGE_TASK_STATUS,
  payload: {
    id,status
  }
});
