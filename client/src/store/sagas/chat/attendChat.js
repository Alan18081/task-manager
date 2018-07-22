import { takeLatest, spawn, select } from "redux-saga/effects";
import { ATTEND_CHAT } from "../../actions/types";

import { sendChatMessageSaga } from "../messages/sendChatMessage";
import { leaveChatSaga } from "./leaveChat";

export function* attendChatSaga() {
  yield takeLatest(ATTEND_CHAT, function*({ payload }) {
    const socket = yield select(({socket}) => socket);
    socket.emit("newUser", { roomId: payload });
    const sendMessageProcess = yield spawn(sendChatMessageSaga, socket);
    yield spawn(
      leaveChatSaga,
      socket,
      sendMessageProcess
    );
  });
}
