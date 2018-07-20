import { takeLatest } from "redux-saga/effects";
import { SEND_MESSAGE } from "../../actions/types";

export function* sendMessageSaga(socket) {
  yield takeLatest(SEND_MESSAGE, ({ payload }) => {
    socket.emit("newMessage", payload);
  });
}
