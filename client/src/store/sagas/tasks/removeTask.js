import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";
import { REMOVE_TASK } from "../../actions/types";
import { removeTaskSuccess, serverError } from "../../actions";

export function* removeTaskSaga() {
  yield takeLatest(REMOVE_TASK, function*({ payload }) {
    try {
      yield call(axios.delete, `/tasks/${payload}`);
      yield put(removeTaskSuccess(payload));
    } catch (e) {
      yield put(serverError());
    }
  });
}
