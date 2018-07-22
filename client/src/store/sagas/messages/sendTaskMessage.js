import { takeLatest, select } from "redux-saga/effects";
import { SEND_TASK_MESSAGE } from "../../actions/types";

export function* sendTaskMessageSaga() {
  yield takeLatest(SEND_TASK_MESSAGE, function*({ payload }) {
      const socket = yield select(({socket}) => socket);
      socket.emit("sendTaskMessage",payload);
  });
}
