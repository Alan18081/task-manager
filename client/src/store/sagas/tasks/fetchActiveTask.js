import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ACTIVE_TASK } from "../../actions/types";
import { fetchActiveTaskSuccess, serverError } from "../../actions/index";

export function* fetchActiveTaskSaga() {
  yield takeLatest(FETCH_ACTIVE_TASK, function*({ payload }) {
    try {
      const tasks = yield select(({ tasks }) => tasks.get("list"));
      const allTasks = yield select(({ board }) => board.get("tasks"));
      let activeTask;

      if (tasks) {
        activeTask = tasks.find(task => task.get("_id") === payload);
      } else if (allTasks) {
        activeTask = allTasks.find(task => task.get("_id") === payload);
      } else {
        const { data } = yield call(axios.get, `/tasks/${payload}`);
        activeTask = data;
      }
      yield put(fetchActiveTaskSuccess(activeTask));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
