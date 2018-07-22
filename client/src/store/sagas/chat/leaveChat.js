import { cancel, take } from "redux-saga/effects";
import { LEAVE_CHAT } from "../../actions/types";

export function* leaveChatSaga(socket, sendMessage) {
  const { payload } = yield take(LEAVE_CHAT);
  yield cancel(sendMessage);
  socket.emit("leaveRoom", { payload });
}
