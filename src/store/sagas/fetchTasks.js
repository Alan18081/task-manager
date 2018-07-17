import { call, take, put } from "redux-saga/effects";
import axios from "../../axios";
import { fetchTasksSuccess, serverError } from "../actions";
import { FETCH_TASKS } from "../actions/types";

export function* fetchTasksSaga() {
  try {
    yield take(FETCH_TASKS);
    const { data } = yield call(axios.get, "/tasks");
    yield put(fetchTasksSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
