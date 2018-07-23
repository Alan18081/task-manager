import { call, put, take } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ALL_TASKS } from "../../actions/types";
import { fetchTasksSuccess, serverError } from "../../actions/index";

export function* fetchAllTasksSaga() {
  try {
    yield take(FETCH_ALL_TASKS);
    const { data } = yield call(axios.get, "/tasks");
    yield put(fetchTasksSuccess(data));
  } catch (e) {
    yield put(serverError());
  }
}
