import { call, put, takeLatest, spawn } from "redux-saga/effects";
import { replace } from "connected-react-router";
import axios from "../../../axios";
import { LOGIN } from "../../actions/types";
import {
  loginStart,
  fetchLoggedUserSuccess,
  loginFailed,
  loginSuccess,
  serverError
} from "../../actions";

import { logoutSaga } from "./logout";
import { setSocketConnectionSaga } from "../socket/setSocketConnection";

export function* loginSaga() {
  yield takeLatest(LOGIN, function*({ payload }) {
    try {
      yield put(loginStart());
      const { data } = yield call(axios.post, "/login", payload);
      localStorage.setItem("jsonToken", data.token);
      yield put(loginSuccess());
      yield put(replace("/tasks"));
      yield put(fetchLoggedUserSuccess(data.user));
      yield spawn(logoutSaga);
      yield spawn(setSocketConnectionSaga);
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
