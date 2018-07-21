import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ACTIVE_TASK } from "../../actions/types";
import { fetchActiveTaskSuccess, serverError } from "../../actions/index";

export function* fetchActiveTaskSaga() {
  yield takeLatest(FETCH_ACTIVE_TASK, function*({ payload }) {
    try {
      const tasks = yield select(({ tasks }) => tasks.get("list"));
      const activeTask = tasks.find(task => task.get("_id") === payload);
      if(activeTask) {
        yield put(fetchActiveTaskSuccess(activeTask));
      }
      else {
        const {data} = yield call(axios.get,`/tasks/${payload}`);
        yield put(fetchActiveTaskSuccess(Boolean(data)));
      }

    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
