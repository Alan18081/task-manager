import {fromJS, List} from "immutable";
import {
  FETCH_ALL_USERS_SUCCESS,
  FETCH_USER_SUCCESS
} from "../actions/types";

const initialState = null;

const fetchUserSuccess = (state,payload) => {
  if(!state) {
    return new List([fromJS(payload)]);
  }
  const index = state.find(user => user.get("_id") === payload);
  if(index >= 0) {
    return state.update(index,fromJS(payload));
  }
  return state.push(fromJS(payload));
};

export default (state = initialState, {type,payload}) => {
  switch (type) {
    case FETCH_ALL_USERS_SUCCESS:
      return fromJS(payload);
    case FETCH_USER_SUCCESS:
      return fetchUserSuccess(state,payload);
    default:
      return state;
  }
};