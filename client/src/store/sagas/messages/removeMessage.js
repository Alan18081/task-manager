import {select,takeLatest,put,call} from "redux-saga/effects";
import axios from "../../../axios";
import {REMOVE_MESSAGE} from "../../actions/types";
import {serverError} from "../../actions";

export function* removeMessageSaga() {
  yield takeLatest(REMOVE_MESSAGE, function* ({payload}) {
    try {
      const socket = yield select(({socket}) => socket);
      const roomId = yield select(({chat}) => chat.get("room").get("_id"));
      yield call(axios.delete,`/messages/${payload}`);
      socket.emit("removeMessage",{messageId: payload,roomId});
    }
    catch (e) {
      yield put(serverError());
    }
  })
}