import {all, call, takeLatest, put, select } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ACTIVE_TASK } from "../../actions/types";
import { fetchActiveTaskSuccess, serverError } from "../../actions/index";

import {fetchMessagesByTaskIdSaga} from "../messages/fetchMessagesByTaskId";

export function* fetchActiveTaskSaga() {
  yield takeLatest(FETCH_ACTIVE_TASK, function*({ payload }) {
    try {
      const tasks = yield select(({ tasks }) => tasks.get("list"));
      const activeTask = tasks.find(task => task.get("_id") === payload);
      yield call(fetchMessagesByTaskIdSaga,payload);
      if(activeTask) {
        yield put(fetchActiveTaskSuccess(activeTask));
      }
      else {
        const {data} = yield call(axios.get,`/tasks/${payload}`);
        yield put(fetchActiveTaskSuccess(data));
      }

    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
