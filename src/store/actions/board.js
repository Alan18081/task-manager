import {
  FETCH_ALL_TASKS,
  FETCH_ALL_TASKS_SUCCESS,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS
} from "./types";

export const fetchAllTasks = () => ({
  type: FETCH_ALL_TASKS
});

export const fetchAllUsersSuccess = users => ({
  type: FETCH_ALL_USERS_SUCCESS,
  payload: users
});

export const fetchAllUsers = () => ({
  type: FETCH_ALL_USERS
});

export const fetchAllTasksSuccess = tasks => ({
  type: FETCH_ALL_TASKS_SUCCESS,
  payload: tasks
});
