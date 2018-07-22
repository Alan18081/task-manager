import { takeLatest} from "redux-saga/effects";
import { SEND_CHAT_MESSAGE } from "../../actions/types";

export function* sendChatMessageSaga(socket) {
  yield takeLatest(SEND_CHAT_MESSAGE, ({ payload }) => {
    socket.emit("addChatMessage", payload);
  });
}
