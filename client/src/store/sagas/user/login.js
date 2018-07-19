import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";
import { LOGIN } from "../../actions/types";
import {
  loginStart,
  fetchUserSuccess,
  loginFailed,
  loginSuccess,
  serverError
} from "../../actions";

export function* loginSaga() {
  yield takeLatest(LOGIN, function*({ payload }) {
    try {
      yield put(loginStart());
      const { data } = yield call(axios.post, "/login", payload);
      if (data.errors) {
        yield put(loginFailed(data.errors));
      } else {
        localStorage.setItem("jsonToken", data.token);
        yield put(loginSuccess());
        yield put(fetchUserSuccess(data.user));
      }
    } catch (e) {
      yield put(serverError());
    }
  });
}
