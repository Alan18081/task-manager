import { call, put, take, spawn } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "../../../axios";
import { FETCH_LOGGED_USER } from "../../actions/types";
import { fetchLoggedUserSuccess, serverError } from "../../actions/index";

import { setSocketConnectionSaga } from "../socket/setSocketConnection";
import { logoutSaga } from "../user/logout";

export function* fetchLoggedUserSaga() {
  try {
    yield take(FETCH_LOGGED_USER);
    const { data } = yield call(axios.get, "/currentUser");
    yield put(fetchLoggedUserSuccess(data));
    yield call(setSocketConnectionSaga);
    yield spawn(logoutSaga);
  } catch (e) {
    if (e.response.status === 401) {
      yield put(fetchLoggedUserSuccess(false));
      yield put(push("/login"));
    } else {
      yield put(serverError());
    }
  }
}
