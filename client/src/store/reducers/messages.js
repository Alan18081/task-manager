import {fromJS} from "immutable";
import {
  FETCH_MESSAGES_LIST_SUCCESS,
  FETCH_MESSAGE_SUCCESS,
  RESET_ACTIVE_MESSAGE,
  GET_ACTIVE_MESSAGE,
  UPDATE_MESSAGE_SUCCESS,
  REMOVE_MESSAGE_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  list: fromJS([]),
  activeMessage: null,
  editing: false
});

const updateMessageSuccess = (state,payload) => {
  const message = state.get("list").find(msg => msg.get("_id") === payload._id);
  if(message) {
    return state.update("list",messages => messages.update(
      messages.findIndex(msg => msg.get("_id") === payload._id),
      msg => fromJS(payload)
    ));
  }
  return state;
};

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case GET_ACTIVE_MESSAGE:
      return state.merge({
        activeMessage: state.get("list").find(msg => msg.get("_id") === payload),
        editing: true
      });
    case RESET_ACTIVE_MESSAGE:
      return state.merge({
        activeMessage: null,
        editing: false
      });
    case FETCH_MESSAGES_LIST_SUCCESS:
      return state.update(
        "list",
        messages => messages.concat(fromJS(payload)).toSet().toList()
      );
    case FETCH_MESSAGE_SUCCESS:
      return state.update("list",messages => messages.push(fromJS(payload)).toSet().toList());
    case UPDATE_MESSAGE_SUCCESS:
      return updateMessageSuccess(state,payload);
    case REMOVE_MESSAGE_SUCCESS:
      return state.update("list", messages => messages.filter(msg => msg.get("_id") !== payload));
    default:
      return state;
  }
};