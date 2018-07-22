import { takeLatest, spawn, select } from "redux-saga/effects";
import { ATTEND_CHAT } from "../../actions/types";

import { sendChatMessageSaga } from "../messages/sendChatMessage";
import { watchMessageSaga } from "../messages/watchMessage";
import { leaveChatSaga } from "./leaveChat";

export function* attendChatSaga() {
  yield takeLatest(ATTEND_CHAT, function*({ payload }) {
    const socket = yield select(({socket}) => socket);
    socket.emit("newUser", { roomId: payload });
    const watchMessagesProcess = yield spawn(watchMessageSaga, socket);
    const sendMessageProcess = yield spawn(sendChatMessageSaga, socket);
    yield spawn(
      leaveChatSaga,
      socket,
      watchMessagesProcess,
      sendMessageProcess
    );
  });
}
