import { cancel, take } from "redux-saga/effects";
import { LEAVE_CHAT } from "../../actions/types";

export function* leaveChatSaga(socket, watchMessage, sendMessage) {
  const { payload } = yield take(LEAVE_CHAT);
  yield cancel(watchMessage);
  yield cancel(sendMessage);
  socket.emit("leaveRoom", { payload });
}
