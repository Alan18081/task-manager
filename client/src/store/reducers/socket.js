import {SET_SOCKET_CONNECTION_SUCCESS} from "../actions/types";

const initialState = null;

export default (state = initialState, {type,payload}) => {
  switch(type) {
    case SET_SOCKET_CONNECTION_SUCCESS:
      return payload;
    default:
      return state;
  }
};