import {call,put} from "redux-saga/effects";
import axios from "../../../axios";
import {fetchMessagesListSuccess,serverError} from "../../actions";

export function* fetchMessagesByTaskIdSaga(id) {
  try {
    const {data} = yield call(axios.get,`/tasks/${id}/messages`);
    yield put(fetchMessagesListSuccess(data));
  }
  catch (e) {
    yield put(serverError());
  }
}