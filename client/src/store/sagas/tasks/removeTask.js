import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "../../../axios";
import { REMOVE_TASK } from "../../actions/types";
import { removeTaskSuccess, serverError } from "../../actions";

export function* removeTaskSaga() {
  yield takeLatest(REMOVE_TASK, function*({ payload }) {
    try {
      const socket = yield select(({socket}) => socket);
      yield call(axios.delete, `/tasks/${payload}`);
      socket.emit("onRemoveTask",{id: payload});
      yield put(removeTaskSuccess(payload));
    } catch (e) {
      yield put(serverError());
    }
  });
}
