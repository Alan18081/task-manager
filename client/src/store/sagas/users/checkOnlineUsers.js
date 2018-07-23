import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { fetchUserSuccess } from "../../actions/index";

export function* checkOnlineUsersSaga() {
  const socket = yield select(({ socket }) => socket);
  const channel = new eventChannel(emit => {
    socket.on("newOnlineUser", user => {
      emit(user);
    });
    socket.on("newOfflineUser", user => {
      emit(user);
      console.log(user);
    });

    return () => {};
  });

  while (true) {
    let user = yield take(channel);
    yield put(fetchUserSuccess(user));
  }
}
