import {fromJS} from "immutable";
import {
  FETCH_MESSAGES_LIST_SUCCESS,
  FETCH_MESSAGE_SUCCESS
} from "../actions/types";

const initialState = fromJS([]);

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case FETCH_MESSAGES_LIST_SUCCESS:
      return fromJS(payload);
    case FETCH_MESSAGE_SUCCESS:
      return state.push(fromJS(payload));
    default:
      return state;
  }
};