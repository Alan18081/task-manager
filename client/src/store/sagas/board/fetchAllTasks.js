import { call, put, take } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ALL_TASKS } from "../../actions/types";
import { fetchAllTasksSuccess, serverError } from "../../actions/index";

export function* fetchAllTasksSaga() {
  try {
    yield take(FETCH_ALL_TASKS);
    const { data } = yield call(axios.get, "/tasks");
    console.log(data);
    yield put(fetchAllTasksSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
