import { put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { CREATE_TASK } from "../../actions/types";

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK, function*({ payload }) {
    const socket = yield select(({socket}) => socket);
    const userId = yield select(({user}) => user.get("profile").get("_id"));
    socket.emit("onCreateTask",{...payload,creator: userId});
    yield put(push("/tasks"));
  });
}
