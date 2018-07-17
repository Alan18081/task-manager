import { call, take, put } from "redux-saga/effects";
import axios from "../../axios";
import { FETCH_ACTIVE_TASK } from "../actions/types";
import { fetchActiveTaskSuccess, serverError } from "../actions";

export function* fetchActiveTaskSaga() {
  try {
    const { payload } = yield take(FETCH_ACTIVE_TASK);
    const { data } = yield call(axios.get, `/tasks/${payload}`);
    yield put(fetchActiveTaskSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
