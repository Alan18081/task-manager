import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";
import { REGISTER } from "../../actions/types";
import {
  fetchUserSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  serverError
} from "../../actions";

export function* registerSaga() {
  yield takeLatest(REGISTER, function*({ payload }) {
    try {
      yield put(registerStart());
      const { data } = yield call(axios.post, "/register", payload);
      if (data.errors) {
        yield put(registerFailed(data.errors));
      } else {
        yield put(registerSuccess());
        yield put(fetchUserSuccess(data));
      }
    } catch (e) {
      yield put(serverError());
    }
  });
}
