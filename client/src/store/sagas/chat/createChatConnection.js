import { takeLatest, spawn } from "redux-saga/effects";
import io from "socket.io-client";
import { url } from "../../../config";
import { CREATE_CHAT_CONNECTION } from "../../actions/types";

import { sendMessageSaga } from "./sendMessage";
import { watchMessageSaga } from "./watchMessage";
import { leaveChatSaga } from "./leaveChat";

export function* createChatConnectionSaga() {
  yield takeLatest(CREATE_CHAT_CONNECTION, function*({ payload }) {
    const socket = io(url);
    socket.emit("newUser", { roomId: payload });
    const watchMessagesProcess = yield spawn(watchMessageSaga, socket);
    const sendMessageProcess = yield spawn(sendMessageSaga, socket);
    yield spawn(
      leaveChatSaga,
      socket,
      watchMessagesProcess,
      sendMessageProcess
    );
  });
}
