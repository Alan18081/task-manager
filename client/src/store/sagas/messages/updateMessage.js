import {takeLatest,call,put,select} from "redux-saga/effects";
import axios from "../../../axios";
import {UPDATE_MESSAGE} from "../../actions/types";
import {serverError} from "../../actions";

export function* updateMessageSaga() {
  yield takeLatest(UPDATE_MESSAGE,function* ({payload: {id,text}}) {
    try {
      const socket = yield select(({socket}) => socket);
      const roomId = yield select(({chat}) => chat.get("room").get("_id"));
      socket.emit("editMessage",{messageId: id,text,roomId});
    }
    catch (e) {
      yield put(serverError());
    }
  });
}