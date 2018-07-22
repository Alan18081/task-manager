import {select,takeLatest} from "redux-saga/effects";
import {REMOVE_MESSAGE} from "../../actions/types";

export function* removeMessageSaga() {
  yield takeLatest(REMOVE_MESSAGE, function* ({payload: {messageId,roomId}}) {
    const socket = yield select(({socket}) => socket);
    if(roomId) {
      socket.emit("removeChatMessage",{messageId,roomId});
    }
    else {
      socket.emit("removeTaskMessage",{messageId});
    }
  })
}