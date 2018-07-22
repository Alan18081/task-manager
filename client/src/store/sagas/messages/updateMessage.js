import {takeLatest,put,select} from "redux-saga/effects";
import {UPDATE_MESSAGE} from "../../actions/types";
import {serverError} from "../../actions";

export function* updateMessageSaga() {
  yield takeLatest(UPDATE_MESSAGE,function* ({payload: {id,text}}) {
    try {
      const socket = yield select(({socket}) => socket);
      const activeMessage = yield select(
        ({messages}) => messages.get("activeMessage")
      );
      if(activeMessage.get("taskId")) {
        socket.emit("editTaskMessage",{messageId: id,text})
      }
      else {
        const roomId = yield select(({chat}) => chat.get("room").get("_id"));
        socket.emit("editChatMessage",{messageId: id,text,roomId});
      }
    }
    catch (e) {
      yield put(serverError());
    }
  });
}