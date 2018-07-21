import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_CHAT_ROOM } from "../../actions/types";
import {
  serverError,
  fetchChatRoomSuccess,
  attendChat
} from "../../actions";

export function* fetchChatRoomSaga() {
  yield takeLatest(FETCH_CHAT_ROOM, function*({ payload }) {
    try {
      const { data } = yield call(axios.get, `/users/${payload}/chat`);
      yield put(attendChat(data._id));
      yield put(fetchChatRoomSuccess(data));
    } catch (e) {
      yield put(serverError());
    }
  });
}
