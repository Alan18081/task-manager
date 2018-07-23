import {put,spawn,select} from "redux-saga/effects";
import io from "socket.io-client";
import {setSocketConnectionSuccess} from "../../actions";
import {url} from "../../../config";

import {checkOnlineUsersSaga} from "../users/checkOnlineUsers";
import {watchTasksSaga} from "../tasks/watchTasks";
import {watchMessageSaga} from "../messages/watchMessage";

export function* setSocketConnectionSaga() {
  const socket = io(url);
  const user = yield select(({user}) => user.get("profile"));
  if(user && user.get("_id")) {
    socket.emit('attendOnlineUser',{userId: user.get("_id")});
    yield put(setSocketConnectionSuccess(socket));
    yield spawn(checkOnlineUsersSaga);
    yield spawn(watchTasksSaga);
    yield spawn(watchMessageSaga);
  }
}
