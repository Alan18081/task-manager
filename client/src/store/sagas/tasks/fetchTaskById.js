import {call,put, select} from "redux-saga/effects";
import axios from "../../../axios";
import {serverError} from "../../actions";
import {fetchTaskByIdSuccess,fetchActiveTaskSuccess} from "../../actions";

export function* fetchTaskByIdSaga(id) {
  try {
    const {data} = yield call(axios.get,`/tasks/${id}`);
    const activeTask = yield select(({tasks}) => tasks.get("activeTask"));
    if(activeTask && activeTask.get("_id") === data._id) {
      yield put(fetchActiveTaskSuccess(data));
    }
    yield put(fetchTaskByIdSuccess(data));
  }
  catch (e) {
    yield put(serverError());
  }
}