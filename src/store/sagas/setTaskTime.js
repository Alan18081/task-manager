import { call, put, take } from "redux-saga/effects";
import axios from "../../axios";
import { SET_TASK_TIME } from "../actions/types";
import {
  serverError,
  changeTaskSuccess,
  fetchActiveTaskSuccess
} from "../actions";

export function* setTaskTimeSaga() {
  try {
    const {
      payload: { id, time }
    } = yield take(SET_TASK_TIME);
    const { data } = yield call(axios.patch, `/tasks/${id}`, {
      estimateTime: time
    });
    yield put(changeTaskSuccess(data));
    yield put(fetchActiveTaskSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
