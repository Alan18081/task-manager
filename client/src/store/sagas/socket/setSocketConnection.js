import {put,select,spawn} from "redux-saga/effects";
import io from "socket.io-client";
import {setSocketConnectionSuccess,serverError} from "../../actions";
import {url} from "../../../config";

import {checkOnlineUsersSaga} from "../users/checkOnlineUsers";
import {watchTasksSaga} from "../tasks/watchTasks";

export function* setSocketConnectionSaga() {
  try {
    const userId = yield select(({user}) => user.get("profile").get("_id"));
    const socket = io(url);
    socket.emit('attendOnlineUser',{userId});
    yield put(setSocketConnectionSuccess(socket));
    yield spawn(checkOnlineUsersSaga);
    yield spawn(watchTasksSaga);
  }
  catch (e) {
    yield put(serverError());
  }
}