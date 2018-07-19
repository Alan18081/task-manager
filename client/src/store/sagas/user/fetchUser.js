import { call, put, take } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_USER } from "../../actions/types";
import { fetchUserSuccess, serverError } from "../../actions/index";

export function* fetchUserSaga() {
  try {
    yield take(FETCH_USER);
    const { data } = yield call(axios.get, "/currentUser");
    yield put(fetchUserSuccess(data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(fetchUserSuccess(false));
    }
    yield put(serverError());
  }
}
