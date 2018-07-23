import {takeLatest,select} from "redux-saga/effects";
import {CHANGE_TASK_STATUS} from "../../actions/types";

export function* changeTaskStatusSaga() {
  yield takeLatest(CHANGE_TASK_STATUS, function* ({payload: {id,status}}) {
    const socket = yield select(({socket}) => socket);
    socket.emit("onChangeTask",{id,task: status});
  });
}
