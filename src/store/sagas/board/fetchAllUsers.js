import { call, put, take } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_ALL_USERS } from "../../actions/types";
import { fetchAllUsersSuccess, serverError } from "../../actions/index";

export function* fetchAllUsersSaga() {
  try {
    yield take(FETCH_ALL_USERS);
    const { data } = yield call(axios.get, "/users");
    yield put(fetchAllUsersSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
