import { fromJS } from "immutable";
import {
  FETCH_CHAT_ROOM_SUCCESS,
  LEAVE_CHAT_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  room: null
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHAT_ROOM_SUCCESS:
      return state.merge({
        room: fromJS(payload)
      });
    case LEAVE_CHAT_SUCCESS:
      return state.set("room", null);
    default:
      return state;
  }
};
