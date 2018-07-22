import {call,put} from "redux-saga/effects";
import axios from "../../../axios";
import {fetchMessagesListSuccess,serverError} from "../../actions";

export function* fetchMessagesByChatIdSaga(id) {
  try {
    const {data} = yield call(axios.get,`/chats/${id}/messages`);
    console.log(data);
    yield put(fetchMessagesListSuccess(data));
  }
  catch (e) {
    yield put(serverError());
  }
}