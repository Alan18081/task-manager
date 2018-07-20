import { put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { getMessageSuccess } from "../../actions/chat";

export function* watchMessageSaga(socket) {
  const channel = new eventChannel(emit => {
    socket.on("message", message => {
      emit(message);
    });
    return () => {};
  });
  while (true) {
    let message = yield take(channel);
    yield put(getMessageSuccess(message));
  }
}
