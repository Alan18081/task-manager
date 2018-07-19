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
      const { data } = yield call(axios.post, "/signup", payload);
      yield call(localStorage.setItem, "jsonToken", data.token);
      yield put(registerSuccess());
      yield put(fetchUserSuccess(data.user));
    } catch (e) {
      if (e.response.status === 401) {
        console.log(e.response);
        yield put(registerFailed(e.response.data.errors));
      } else {
        yield put(serverError());
      }
    }
  });
}
