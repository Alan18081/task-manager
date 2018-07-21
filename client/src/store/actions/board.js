import {
  FETCH_ALL_TASKS,
  FETCH_ALL_TASKS_SUCCESS
} from "./types";

export const fetchAllTasks = () => ({
  type: FETCH_ALL_TASKS
});

export const fetchAllTasksSuccess = tasks => ({
  type: FETCH_ALL_TASKS_SUCCESS,
  payload: tasks
});
