import { call, take, put } from "redux-saga/effects";
import axios from "../../../axios";
import { fetchUserTasksSuccess, serverError } from "../../actions/index";
import { FETCH_USER_TASKS } from "../../actions/types";

export function* fetchUserTasksSaga() {
  try {
    yield take(FETCH_USER_TASKS);
    const { data } = yield call(axios.get, "/tasks");
    yield put(fetchUserTasksSuccess(data));
  } catch (e) {
    yield put(serverError());
  }
}
