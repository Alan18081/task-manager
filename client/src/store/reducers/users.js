import { fromJS } from "immutable";
import { FETCH_ALL_USERS_SUCCESS, FETCH_USER_SUCCESS } from "../actions/types";

const initialState = fromJS([]);

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_USERS_SUCCESS:
      return fromJS(payload);
    case FETCH_USER_SUCCESS:
      return state
        .push(fromJS(payload))
        .groupBy(user => user.get("_id"))
        .map(task => task.last())
        .toList();
    default:
      return state;
  }
};
