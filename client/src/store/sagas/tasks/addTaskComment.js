import { put, takeLatest } from "redux-saga/effects";
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
      const { data } = yield call(axios.patch, `/tasks/${id}/addComment`, {
        comment
      });
      yield put(changeTaskSuccess(data));
      yield put(fetchActiveTaskSuccess(data));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
