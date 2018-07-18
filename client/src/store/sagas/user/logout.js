import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LOGOUT } from "../../actions/types";
import { fetchUserSuccess, serverError } from "../../actions";

export function* logoutSaga() {
  yield takeLatest(LOGOUT, function*() {
    try {
      const { data } = yield call(axios.get, "/logout");
      yield put(fetchUserSuccess(data));
    } catch (e) {
      yield put(serverError());
    }
  });
}
