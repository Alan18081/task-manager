import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "../../../axios";
import { CHANGE_TASK } from "../../actions/types";
import {
  changeTaskSuccess,
  serverError,
  fetchActiveTaskSuccess
} from "../../actions/index";

export function* changeTaskSaga() {
  yield takeLatest(CHANGE_TASK, function*({ payload: { id, info } }) {
    try {
      const { data } = yield call(axios.patch, `/tasks/${id}`, {
        ...info
      });
      const tasks = yield select(({ tasks }) => tasks.get("list"));
      if (tasks) {
        yield put(changeTaskSuccess(data));
      }
      yield put(fetchActiveTaskSuccess(data));
    } catch (e) {
      yield put(serverError());
    }
  });
}
