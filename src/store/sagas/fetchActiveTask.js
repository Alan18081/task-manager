import { call, takeLatest, put } from "redux-saga/effects";
import axios from "../../axios";
import { FETCH_ACTIVE_TASK } from "../actions/types";
import { fetchActiveTaskSuccess, serverError } from "../actions";

export function* fetchActiveTaskSaga() {
  yield takeLatest(FETCH_ACTIVE_TASK, function*({ payload }) {
    try {
      const { data } = yield call(axios.get, `/tasks/${payload}`);
      yield put(fetchActiveTaskSuccess(data));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
