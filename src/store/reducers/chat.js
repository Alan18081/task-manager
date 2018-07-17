import {fromJS} from 'immutable';
import {FETCH_CHAT_ROOM_SUCCESS,FETCH_CHAT_USER_SUCCESS} from '../../store/actions/types';

const initialState = fromJS({
  room: null,
  otherUser: null
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case FETCH_CHAT_ROOM_SUCCESS:
      return state.set('room',fromJS(payload));
    case FETCH_CHAT_USER_SUCCESS:
      return state.set('otherUser',fromJS(payload));
    default:
      return state;
  }
};