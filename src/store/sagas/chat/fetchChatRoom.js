import {takeLatest,put,call,select} from 'redux-saga/effects';
import axios from '../../../axios';
import {FETCH_CHAT_ROOM} from '../../actions/types';
import {serverError,fetchChatRoomSuccess,fetchChatUserSuccess} from '../../actions';

export function* fetchChatRoomSaga() {
  yield takeLatest(FETCH_CHAT_ROOM,function* ({payload}) {
    try {
      const {data} = yield call(axios.get,`/chats/`);
      const anotherUser = yield select(
        ({board}) => board.get('users').find(user => user.get('id') === payload)
      );
      yield put(fetchChatRoomSuccess(data));
      yield put(fetchChatUserSuccess(anotherUser));
    }
    catch(e) {
      console.log(e);
      yield put(serverError());
    }
  });
}