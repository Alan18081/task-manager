import { call, put, takeLatest } from "redux-saga/effects";
import { replace } from "connected-react-router";
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
      localStorage.setItem("jsonToken", data.token);
      yield put(loginSuccess());
      yield put(replace("/tasks"));
      yield put(fetchUserSuccess(data.user));
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        yield put(loginFailed(e.response.data.errors));
      } else {
        yield put(serverError());
      }
    }
  });
}
