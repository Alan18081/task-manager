import { takeLatest, put, call } from "redux-saga/effects";
import axios from "../../../axios";
import { FETCH_CHAT_ROOM } from "../../actions/types";
import {
  serverError,
  fetchChatRoomSuccess,
  fetchChatUserSuccess
} from "../../actions";

export function* fetchChatRoomSaga() {
  yield takeLatest(FETCH_CHAT_ROOM, function*({ payload }) {
    try {
      const { data } = yield call(axios.get, `/chats/`);
      const anotherUser = data[0].users.find(
        user => user.id === Number(payload)
      );
      console.log(anotherUser);
      yield put(fetchChatRoomSuccess(data[0]));
      yield put(fetchChatUserSuccess(anotherUser));
    } catch (e) {
      console.log(e);
      yield put(serverError());
    }
  });
}
