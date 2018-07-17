import { put, takeLatest } from "redux-saga/effects";
// import { fromJS } from "immutable";
import { ADD_TASK_COMMENT } from "../actions/types";
import { serverError } from "../actions";

export function* addTaskCommentSaga() {
  yield takeLatest(ADD_TASK_COMMENT, function*() {
    try {
      // const tasks = yield select(({ tasks }) => tasks.get("list"));
      // if(tasks) {
      //   const task = tasks.
      // }
      // const newTask = task.update("comments", comments =>
      //   comments.push(
      //     fromJS({
      //       author: "Alan",
      //       text: comment,
      //       createdAt: new Date().toLocaleTimeString()
      //     })
      //   )
      // );
      // yield put(changeTaskSuccess(newTask));
      // yield put(fetchActiveTaskSuccess(newTask));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
