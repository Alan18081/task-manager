import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";
import { CHANGE_TASK_STATUS } from "../../actions/types";
import {
  changeTaskSuccess,
  serverError,
  fetchActiveTaskSuccess
} from "../../actions/index";

export function* changeTaskStatusSaga() {
  yield takeLatest(CHANGE_TASK_STATUS, function*({ payload }) {
    try {
      const { data } = yield call(axios.patch, `/tasks/${payload.id}`, {
        status: payload.status
      });
      yield put(changeTaskSuccess(data));
      yield put(fetchActiveTaskSuccess(data));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
