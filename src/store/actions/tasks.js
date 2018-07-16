import {FETCH_TASKS,FETCH_TASKS_SUCCESS} from "./types";

export const fetchTasks = () => ({
   type: FETCH_TASKS
});

export const fetchTasksSuccess = (tasks) => ({
   type: FETCH_TASKS_SUCCESS,
   payload: tasks
});