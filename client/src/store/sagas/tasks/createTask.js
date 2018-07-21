import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "../../../axios";
import { CREATE_TASK } from "../../actions/types";
import { createTaskSuccess, serverError } from "../../actions";

export function* createTaskSaga() {
  yield takeLatest(CREATE_TASK, function*({ payload }) {
    try {
      const socket = yield select(({socket}) => socket);
      const { data } = yield call(axios.post, "/tasks", payload);
      yield put(createTaskSuccess(data));
      yield put(push("/tasks"));
      socket.emit('onCreateTask',{id: data._id});
    } catch (e) {
      yield put(serverError());
    }
  });
}
