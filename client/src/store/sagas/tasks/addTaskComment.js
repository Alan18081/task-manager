import { put, takeLatest, call, select } from "redux-saga/effects";
import axios from "../../../axios";
import { ADD_TASK_COMMENT } from "../../actions/types";
import {
  serverError,
  changeTaskSuccess,
  fetchActiveTaskSuccess
} from "../../actions/index";

export function* addTaskCommentSaga() {
  yield takeLatest(ADD_TASK_COMMENT, function*({ payload: { id, comment } }) {
    try {
      const { data } = yield call(axios.patch, `/tasks/${id}/addMessage`, {
        comment
      });
      const loadedTasks = yield select(({tasks}) => tasks.get("list"));
      if(loadedTasks) {
        yield put(changeTaskSuccess(data));
      }
      yield put(fetchActiveTaskSuccess(data));
    } catch (e) {
      yield put(serverError());
    }
  });
}
