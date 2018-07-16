import {CHANGE_TASK_STATUS, CHANGE_TASK_SUCCESS, FETCH_TASKS, FETCH_TASKS_SUCCESS} from "./types";

export const fetchTasks = () => ({
   type: FETCH_TASKS
});

export const fetchTasksSuccess = (tasks) => ({
   type: FETCH_TASKS_SUCCESS,
   payload: tasks
});

export const changeTaskStatus = (id,status) => ({
   type: CHANGE_TASK_STATUS,
   payload: {
      id,status
   }
});

export const changeTaskSuccess = (task) => ({
   type: CHANGE_TASK_SUCCESS,
   payload: task
});