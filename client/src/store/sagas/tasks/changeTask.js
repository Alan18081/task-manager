import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
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
      const loadedTasks = yield select(({ tasks }) => tasks.get("list"));
      if (loadedTasks) {
        yield put(changeTaskSuccess(data));
      }
      yield put(fetchActiveTaskSuccess(data));
      yield put(push("/tasks"));
    } catch (e) {
      yield put(serverError());
    }
  });
}
