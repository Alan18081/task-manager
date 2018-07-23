import { call, take, put, select } from "redux-saga/effects";
import axios from "../../../axios";
import { fetchTasksSuccess, serverError } from "../../actions/index";
import { FETCH_USER_TASKS } from "../../actions/types";

export function* fetchUserTasksSaga() {
  try {
    yield take(FETCH_USER_TASKS);
    const userId = yield select(({user}) => user.get("profile").get("_id"));
    const { data } = yield call(axios.get, `/users/${userId}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jsonToken")}`
      }
    });
    yield put(fetchTasksSuccess(data));
  } catch (e) {
    yield put(serverError());
  }
}
