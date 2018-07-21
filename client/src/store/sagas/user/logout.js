import { call, put, take, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "../../../axios";
import { LOGOUT } from "../../actions/types";
import { fetchLoggedUserSuccess, serverError } from "../../actions";

export function* logoutSaga() {
  try {
    yield take(LOGOUT);
    const socket = yield select(({socket}) => socket);
    const { data } = yield call(axios.get, "/logout");
    localStorage.removeItem("jsonToken");
    socket.disconnect();
    yield put(fetchLoggedUserSuccess(data));
    yield put(push("/login"));
  } catch (e) {
    console.log(e);
    yield put(serverError());
  }
}
