import { fromJS } from "immutable";
import {
  CREATE_CHAT_CONNECTION_SUCCESS,
  FETCH_CHAT_ROOM_SUCCESS,
  GET_MESSAGE_SUCCESS,
  LEAVE_CHAT_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  room: null,
  connected: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHAT_ROOM_SUCCESS:
      return state.merge({
        room: fromJS(payload)
      });
    case CREATE_CHAT_CONNECTION_SUCCESS:
      return state.set("connected", true);
    case LEAVE_CHAT_SUCCESS:
      return state.set("connected", false);
    case GET_MESSAGE_SUCCESS:
      return state.update("room", room =>
        room.update("messages", messages => messages.push(fromJS(payload)))
      );
    default:
      return state;
  }
};
