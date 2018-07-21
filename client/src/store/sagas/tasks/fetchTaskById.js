import {call,put} from "redux-saga/effects";
import axios from "../../../axios";
import {serverError} from "../../actions";
import {fetchTaskByIdSuccess} from "../../actions";

export function* fetchTaskByIdSaga(id) {
  try {
    const {data} = yield call(axios.get,`/tasks/${id}`);
    console.log(data);
    yield put(fetchTaskByIdSuccess(data));
  }
  catch (e) {
    yield put(serverError());
  }
}