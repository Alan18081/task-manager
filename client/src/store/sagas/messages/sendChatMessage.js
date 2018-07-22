import { takeLatest, select} from "redux-saga/effects";
import { SEND_CHAT_MESSAGE } from "../../actions/types";

export function* sendChatMessageSaga() {
  yield takeLatest(SEND_CHAT_MESSAGE, function*({ payload }) {
    const socket = yield select(({socket}) => socket);
    socket.emit("sendChatMessage", payload);
  });
}
